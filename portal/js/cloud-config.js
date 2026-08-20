/*
  Public Alpha cloud configuration.

  Local play remains fully available while enabled is false.
  The publishable key is designed for browser use only when
  Row Level Security from supabase/schema.sql is enabled.

  Never place a Supabase secret key or service_role key here.
*/

window.MINISTRY_CLOUD_CONFIG =
  window.MINISTRY_CLOUD_CONFIG ||
  {
    enabled:
      false,
    url:
      "",
    publishableKey:
      "",
    sdkUrl:
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
  };
