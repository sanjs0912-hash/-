export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      const form = await request.formData();
      const prompt = form.get("prompt");
      const file = form.get("file");

      let mediaBase64 = null;
      let mediaType = null;

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        mediaBase64 = btoa(String.fromCharCode(...bytes));
        mediaType = file.type;
      }

      // Build request to AI model
      const body = {
        model: "gpt-4o-mini",  // best low-cost model
        messages: [
          { role: "user", content: prompt },
          mediaBase64 ? {
            role: "user",
            content: [
              {
                type: "input_media",
                mime_type: mediaType,
                data: mediaBase64
              }
            ]
          } : null
        ].filter(Boolean)
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      return new Response(
        JSON.stringify({ output: result.choices[0].message.content }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("DECA Media Worker active");
  }
}
