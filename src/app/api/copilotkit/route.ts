import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";

export async function POST(req: Request): Promise<Response> {
  const openaiModel = process.env["OPENAI_MODEL"];

  const copilotKit = new CopilotBackend();
  return copilotKit.response(req, new OpenAIAdapter({ model: openaiModel }));
}
