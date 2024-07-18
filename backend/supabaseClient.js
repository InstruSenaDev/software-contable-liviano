// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'TU_SUPABASE_URL';
const supabaseKey = 'TU_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
