const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://gxrnaymgawdvwwgqzzty.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cm5heW1nYXdkdnd3Z3F6enR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NzYyMDMsImV4cCI6MjA3NjQ1MjIwM30.vsiIduM81WnULdpLZbYBQtvSpeAQ16DQ6djGvkfdUNU';

const supabase = supa.createClient(supaUrl, supaAnonKey);


app.listen(8080, () => {
    console.log('listening on port 8080');
});