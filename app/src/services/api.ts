import axios from "axios";

const publicToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YXdyYm1zanl2eGRyZmNuYm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgxMDczMDEsImV4cCI6MTk3MzY4MzMwMX0.93Sm-aifL6-YYsoFC2933WwVmqtpz0pwjXCT7ZLq_pA";

export const apiAllWords = axios.create({
  baseURL: "https:///qzawrbmsjyvxdrfcnbma.supabase.co/rest/v1",
  headers: {
    Authorization: `Bearer ${publicToken}`,
    apikey: publicToken,
  },
});

export const dictionaryApi = axios.create({
  baseURL: "https:///api.dictionaryapi.dev/api/v2/entries/en",
});
