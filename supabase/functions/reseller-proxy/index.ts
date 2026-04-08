import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const API_URL = 'https://mybkregqvkottrzsogmi.supabase.co/functions/v1/reseller-api';

const VALID_ACTIONS = ['create_order', 'check_status', 'get_events', 'list_orders', 'get_balance'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const API_KEY = Deno.env.get('RESELLER_API_KEY');
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (!action || !VALID_ACTIONS.includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid action. Valid actions: ' + VALID_ACTIONS.join(', ') }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate specific action params
    if (action === 'create_order') {
      const validCredits = [10, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000];
      if (!body.credits || !validCredits.includes(body.credits)) {
        return new Response(JSON.stringify({ error: 'Invalid credits amount. Valid: ' + validCredits.join(', ') }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (action === 'check_status' || action === 'get_events') {
      if (!body.order_id || typeof body.order_id !== 'string') {
        return new Response(JSON.stringify({ error: 'order_id is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (action === 'list_orders') {
      if (body.limit && (typeof body.limit !== 'number' || body.limit < 1 || body.limit > 100)) {
        return new Response(JSON.stringify({ error: 'limit must be between 1 and 100' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
