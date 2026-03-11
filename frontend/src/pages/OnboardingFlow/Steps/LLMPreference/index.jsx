import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState, useRef } from "react";
import OpenAiLogo from "@/media/llmprovider/openai.png";
import GenericOpenAiLogo from "@/media/llmprovider/generic-openai.png";
import AzureOpenAiLogo from "@/media/llmprovider/azure.png";
import AnthropicLogo from "@/media/llmprovider/anthropic.png";
import GeminiLogo from "@/media/llmprovider/gemini.png";
import OllamaLogo from "@/media/llmprovider/ollama.png";
import LMStudioLogo from "@/media/llmprovider/lmstudio.png";
import LocalAiLogo from "@/media/llmprovider/localai.png";
import TogetherAILogo from "@/media/llmprovider/togetherai.png";
import FireworksAILogo from "@/media/llmprovider/fireworksai.jpeg";
import MistralLogo from "@/media/llmprovider/mistral.jpeg";
import HuggingFaceLogo from "@/media/llmprovider/huggingface.png";
import PerplexityLogo from "@/media/llmprovider/perplexity.png";
import OpenRouterLogo from "@/media/llmprovider/openrouter.jpeg";
import GroqLogo from "@/media/llmprovider/groq.png";
import KoboldCPPLogo from "@/media/llmprovider/koboldcpp.png";
import TextGenWebUILogo from "@/media/llmprovider/text-generation-webui.png";
import LiteLLMLogo from "@/media/llmprovider/litellm.png";
import AWSBedrockLogo from "@/media/llmprovider/bedrock.png";
import DeepSeekLogo from "@/media/llmprovider/deepseek.png";
import APIPieLogo from "@/media/llmprovider/apipie.png";
import NovitaLogo from "@/media/llmprovider/novita.png";
import XAILogo from "@/media/llmprovider/xai.png";
import ZAiLogo from "@/media/llmprovider/zai.png";
import NvidiaNimLogo from "@/media/llmprovider/nvidia-nim.png";
import CohereLogo from "@/media/llmprovider/cohere.png";
import PPIOLogo from "@/media/llmprovider/ppio.png";
import DellProAiStudioLogo from "@/media/llmprovider/dpais.png";
import MoonshotAiLogo from "@/media/llmprovider/moonshotai.png";
import CometApiLogo from "@/media/llmprovider/cometapi.png";
import GiteeAILogo from "@/media/llmprovider/giteeai.png";
import DockerModelRunnerLogo from "@/media/llmprovider/docker-model-runner.png";
import PrivateModeLogo from "@/media/llmprovider/privatemode.png";
import SambaNovaLogo from "@/media/llmprovider/sambanova.png";
import LemonadeLogo from "@/media/llmprovider/lemonade.png";

import OpenAiOptions from "@/components/LLMSelection/OpenAiOptions";
import GenericOpenAiOptions from "@/components/LLMSelection/GenericOpenAiOptions";
import AzureAiOptions from "@/components/LLMSelection/AzureAiOptions";
import AnthropicAiOptions from "@/components/LLMSelection/AnthropicAiOptions";
import LMStudioOptions from "@/components/LLMSelection/LMStudioOptions";
import LocalAiOptions from "@/components/LLMSelection/LocalAiOptions";
import GeminiLLMOptions from "@/components/LLMSelection/GeminiLLMOptions";
import OllamaLLMOptions from "@/components/LLMSelection/OllamaLLMOptions";
import MistralOptions from "@/components/LLMSelection/MistralOptions";
import HuggingFaceOptions from "@/components/LLMSelection/HuggingFaceOptions";
import TogetherAiOptions from "@/components/LLMSelection/TogetherAiOptions";
import FireworksAiOptions from "@/components/LLMSelection/FireworksAiOptions";
import PerplexityOptions from "@/components/LLMSelection/PerplexityOptions";
import OpenRouterOptions from "@/components/LLMSelection/OpenRouterOptions";
import GroqAiOptions from "@/components/LLMSelection/GroqAiOptions";
import CohereAiOptions from "@/components/LLMSelection/CohereAiOptions";
import KoboldCPPOptions from "@/components/LLMSelection/KoboldCPPOptions";
import TextGenWebUIOptions from "@/components/LLMSelection/TextGenWebUIOptions";
import LiteLLMOptions from "@/components/LLMSelection/LiteLLMOptions";
import AWSBedrockLLMOptions from "@/components/LLMSelection/AwsBedrockLLMOptions";
import DeepSeekOptions from "@/components/LLMSelection/DeepSeekOptions";
import ApiPieLLMOptions from "@/components/LLMSelection/ApiPieOptions";
import NovitaLLMOptions from "@/components/LLMSelection/NovitaLLMOptions";
import XAILLMOptions from "@/components/LLMSelection/XAiLLMOptions";
import ZAiLLMOptions from "@/components/LLMSelection/ZAiLLMOptions";
import NvidiaNimOptions from "@/components/LLMSelection/NvidiaNimOptions";
import PPIOLLMOptions from "@/components/LLMSelection/PPIOLLMOptions";
import DellProAiStudioOptions from "@/components/LLMSelection/DPAISOptions";
import MoonshotAiOptions from "@/components/LLMSelection/MoonshotAiOptions";
import CometApiLLMOptions from "@/components/LLMSelection/CometApiLLMOptions";
import GiteeAiOptions from "@/components/LLMSelection/GiteeAIOptions";
import DockerModelRunnerOptions from "@/components/LLMSelection/DockerModelRunnerOptions";
import PrivateModeOptions from "@/components/LLMSelection/PrivateModeOptions";
import SambaNovaOptions from "@/components/LLMSelection/SambaNovaOptions";
import LemonadeOptions from "@/components/LLMSelection/LemonadeOptions";

import LLMItem from "@/components/LLMSelection/LLMItem";
import System from "@/models/system";
import paths from "@/utils/paths";
import showToast from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// VaultMind: Only local/privacy-friendly LLM providers shown during onboarding.
// Cloud providers are still available via settings if explicitly configured.
const LLMS = [
  {
    name: "Ollama",
    value: "ollama",
    logo: OllamaLogo,
    options: (settings) => <OllamaLLMOptions settings={settings} />,
    description: "Run LLMs locally on your own machine. (Recommended)",
  },
  {
    name: "LM Studio",
    value: "lmstudio",
    logo: LMStudioLogo,
    options: (settings) => <LMStudioOptions settings={settings} />,
    description:
      "Discover, download, and run thousands of cutting edge LLMs in a few clicks.",
  },
  {
    name: "Local AI",
    value: "localai",
    logo: LocalAiLogo,
    options: (settings) => <LocalAiOptions settings={settings} />,
    description: "Run LLMs locally on your own machine.",
  },
  {
    name: "KoboldCPP",
    value: "koboldcpp",
    logo: KoboldCPPLogo,
    options: (settings) => <KoboldCPPOptions settings={settings} />,
    description: "Run local LLMs using koboldcpp.",
  },
  {
    name: "Oobabooga Web UI",
    value: "textgenwebui",
    logo: TextGenWebUILogo,
    options: (settings) => <TextGenWebUIOptions settings={settings} />,
    description: "Run local LLMs using Oobabooga's Text Generation Web UI.",
  },
  {
    name: "Docker Model Runner",
    value: "docker-model-runner",
    logo: DockerModelRunnerLogo,
    options: (settings) => <DockerModelRunnerOptions settings={settings} />,
    description: "Run LLMs using Docker Model Runner.",
  },
  {
    name: "Lemonade",
    value: "lemonade",
    logo: LemonadeLogo,
    options: (settings) => <LemonadeOptions settings={settings} />,
    description:
      "Run local LLMs, ASR, TTS, and more in a single unified AI runtime.",
  },
  {
    name: "NVIDIA NIM",
    value: "nvidia-nim",
    logo: NvidiaNimLogo,
    options: (settings) => <NvidiaNimOptions settings={settings} />,
    description:
      "Run full parameter LLMs directly on your NVIDIA RTX GPU using NVIDIA NIM.",
  },
  {
    name: "Dell Pro AI Studio",
    value: "dpais",
    logo: DellProAiStudioLogo,
    options: (settings) => <DellProAiStudioOptions settings={settings} />,
    description:
      "Run powerful LLMs quickly on NPU powered by Dell Pro AI Studio.",
  },
  {
    name: "Privatemode",
    value: "privatemode",
    logo: PrivateModeLogo,
    options: (settings) => <PrivateModeOptions settings={settings} />,
    description: "Run LLMs with end-to-end encryption.",
  },
  {
    name: "Generic OpenAI",
    value: "generic-openai",
    logo: GenericOpenAiLogo,
    options: (settings) => <GenericOpenAiOptions settings={settings} />,
    description:
      "Connect to any OpenAI-compatible service via a custom configuration.",
  },
];

export default function LLMPreference({
  setHeader,
  setForwardBtn,
  setBackBtn,
}) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLLMs, setFilteredLLMs] = useState([]);
  const [selectedLLM, setSelectedLLM] = useState(null);
  const [settings, setSettings] = useState(null);
  const formRef = useRef(null);
  const hiddenSubmitButtonRef = useRef(null);
  const isHosted = false; // VaultMind is always self-hosted
  const navigate = useNavigate();

  const TITLE = t("onboarding.llm.title");
  const DESCRIPTION = t("onboarding.llm.description");

  useEffect(() => {
    async function fetchKeys() {
      const _settings = await System.keys();
      setSettings(_settings);
      setSelectedLLM(_settings?.LLMProvider || "ollama");
    }
    fetchKeys();
  }, []);

  async function handleForward() {
    try {
      await System.markOnboardingComplete();
      console.log("Onboarding complete");
    } catch (error) {
      console.error("Onboarding complete failed", error);
    } finally {
      if (hiddenSubmitButtonRef.current) {
        hiddenSubmitButtonRef.current.click();
      }
    }
  }

  function handleBack() {
    navigate(paths.onboarding.home());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {};
    const formData = new FormData(form);
    data.LLMProvider = selectedLLM;
    // Default to VaultMind native embedder and LanceDB (local-first)
    data.EmbeddingEngine = "native";
    data.VectorDB = "lancedb";
    for (var [key, value] of formData.entries()) data[key] = value;

    const { error } = await System.updateSystem(data);
    if (error) {
      showToast(`Failed to save LLM settings: ${error}`, "error");
      return;
    }
    navigate(paths.onboarding.userSetup());
  };

  useEffect(() => {
    setHeader({ title: TITLE, description: DESCRIPTION });
    setForwardBtn({ showing: true, disabled: false, onClick: handleForward });
    setBackBtn({ showing: true, disabled: false, onClick: handleBack });
  }, []);

  useEffect(() => {
    const filtered = LLMS.filter((llm) =>
      llm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLLMs(filtered);
  }, [searchQuery, selectedLLM]);

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full">
        <div className="w-full relative border-theme-chat-input-border shadow border-2 rounded-lg text-white">
          <div className="w-full p-4 absolute top-0 rounded-t-lg backdrop-blur-sm">
            <div className="w-full flex items-center sticky top-0">
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="absolute left-4 z-30 text-theme-text-primary"
              />
              <input
                type="text"
                placeholder="Search LLM providers"
                className="bg-theme-bg-secondary placeholder:text-theme-text-secondary z-20 pl-10 h-[38px] rounded-full w-full px-4 py-1 text-sm border border-theme-chat-input-border outline-none focus:outline-primary-button active:outline-primary-button outline-none text-theme-text-primary"
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />
            </div>
          </div>
          <div className="px-4 pt-[70px] flex flex-col gap-y-1 max-h-[390px] overflow-y-auto no-scroll pb-4">
            {filteredLLMs.map((llm) => {
              if (llm.value === "native" && isHosted) return null;
              return (
                <LLMItem
                  key={llm.name}
                  name={llm.name}
                  value={llm.value}
                  image={llm.logo}
                  description={llm.description}
                  checked={selectedLLM === llm.value}
                  onClick={() => setSelectedLLM(llm.value)}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-y-1">
          {selectedLLM &&
            LLMS.find((llm) => llm.value === selectedLLM)?.options(settings)}
        </div>
        <button
          type="submit"
          ref={hiddenSubmitButtonRef}
          hidden
          aria-hidden="true"
        ></button>
      </form>
    </div>
  );
}
