import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db";

import Category from "../models/Category";
import Resource from "../models/Resource";

dotenv.config();

const seedResources = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});

    await Category.insertMany([
      {
        name: "Anime",
        slug: "anime",
        icon: "tv",
        description: "Anime streaming with Sub / Dub",
      },
      {
        name: "AI",
        slug: "ai",
        icon: "sparkles",
        description: "Ai tools and resources",
      },
      {
        name: "Movies",
        slug: "movies",
        icon: "film",
        description: "Movies and TV streaming",
      },
      {
        name: "Reading",
        slug: "reading",
        icon: "book",
        description: "Books and reading resources",
      },
      {
        name: "Software",
        slug: "software",
        icon: "terminal",
        description: "software and developer",
      },
      {
        name: "Gaming",
        slug: "gaming",
        icon: "gamepad",
        description: "Gaming resources",
      },
      {
        name: "Music",
        slug: "music",
        icon: "music",
        description: "Music streaming and audio resources",
      },
      {
        name: "Educational",
        slug: "educational",
        icon: "graduation-cap",
        description: "Courses, tutorials and learning platform",
      },
    ]);

    const animeCategory = await Category.findOne({
      slug: "anime",
    });
    const AiCategory = await Category.findOne({
      slug: "ai",
    });

    const moviesCategory = await Category.findOne({
      slug: "movies",
    });
    const readingCategory = await Category.findOne({
      slug: "reading",
    });

    const softwareCategory = await Category.findOne({
      slug: "software",
    });
    const GamingCategory = await Category.findOne({
      slug: "gaming",
    });
    const musicCategory = await Category.findOne({
      slug: "music",
    });
    const educationalCategory = await Category.findOne({
      slug: "educational",
    });

    if (!animeCategory || !moviesCategory || !softwareCategory || !readingCategory || !GamingCategory || !AiCategory || !musicCategory || !educationalCategory) {
      console.log("Categories not found");
      process.exit(1);
    }

    await Resource.deleteMany({});

    await Resource.insertMany([


      {
        title: "Animepahe",
        url: "https://animepahe.pw",
        description: "Anime streaming with Sub / Dub and NSFW content",
        category: animeCategory._id,
        tags: ["Anime", "sub", "dub", "downloade"],
        featured: true,
        rating: 4.2,
      },

      {
        title: "Animetsu",
        url: "https://animetsu.net", // TODO: verify URL
        description: "Anime streaming with Sub / Dub",
        category: animeCategory._id,
        tags: ["Anime", "Sub", "Dub", "Auto-next"],
        featured: true,
        rating: 4.2,
      },

      {
        title: "AnimeX",
        url: "https://animex.one", // TODO: verify URL
        description: "Anime streaming with Sub / Dub and Auto-Next",
        category: animeCategory._id,
        tags: ["Anime", "Sub", "Dub", "Auto-next"],
        featured: true,
        rating: 4,
      },

      {
        title: "Anidap",
        url: "https://anidap.se", // TODO: verify URL
        description: "Anime streaming with Sub / Dub and Auto-Next",
        category: animeCategory._id,
        tags: ["Anime", "Sub", "Dub", "Auto-next"],
        featured: true,
        rating: 3.8,
      },

      // ⭐ All Manga
      {
        title: "All Manga",
        url: "https://allmanga.to",
        description: "This site has many server options, each of them fully independent and very reliable",
        category: animeCategory._id,
        tags: ["Anime", "Manga", "Large-library", "Multi-server", "Advanced-filters"],
        featured: true,
        rating: 4.3,
      },
      {
        title: "Senshi",
        url: "https://senshi.live", // TODO: verify URL
        description: "Anime streaming with Sub / Dub and Auto-Next",
        category: animeCategory._id,
        tags: ["Anime", "Sub", "Dub", "Auto-next"],
        featured: true,
        rating: 4.5,
      },





      {
        title: "Cineby",
        url: "https://cineby.sc",
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Streaming", "auto-next" , "Multi-server"],
        featured: true,
        rating: 4.2,
      },
      {
        title: "Bitcine",
        url: "https://bitcine.tv", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Streaming", "auto-next" , "Multi-server"],
        featured: false,
        rating: 4,
      },



      {
        title: "Rive 2",
        url: "https://rivestream.ru", // TODO: verify URL
        description: "Movies, TV and Anime streaming (Mirror 2)",
        category: moviesCategory._id,
        tags: ["Streaming", "auto-next"],
        featured: false,
        rating: 3.9,
      },

      {
        title: "BingeBox",
        url: "https://bingebox.to", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: false,
        rating: 4,
      },


      {
        title: "CorsFlix",
        url: "https://watch.corsflix.net", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 4,
      },


      // ⭐ Aether
      {
        title: "Aether",
        url: new URL("https://aether.mom").toString(),
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 4,
      },


      // ⭐ 67Movies & 456movie
      {
        title: "67Movies",
        url: "https://67movies.net", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 3.9,
      },





      {
        title: "FlickyStream ",
        url: "https://flickystream.su", // TODO: verify URL
        description: "Movies, TV and Anime streaming (Mirror 2)",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: false,
        rating: 4,
      },


      // ⭐ ShuttleTV
      {
        title: "ShuttleTV",
        url: "https://shuttletv.su", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 3.8,
      },



      // ⭐ Cinetaro
      {
        title: "Cinetaro",
        url: "https://cinetaro.tv", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 4.5,
      },

      // ⭐ Cinema.BZ
      {
        title: "Cinema BZ",
        url: "https://cinema.bz", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv", "Anime", "auto-next"],
        featured: true,
        rating: 3.5,
      },
      {
        title: "HDhub4u",
        url: "https://new1.hdhub4u.limo/?utm=mn1", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv-shows", "Download", "Multi-language"],
        featured: true,
        rating: 4.5,
      },
      {
        title: "Vegamovies",
        url: "https://vegamovies.diamonds/", // TODO: verify URL
        description: "Movies, TV and Anime streaming",
        category: moviesCategory._id,
        tags: ["Movies", "Tv-shows", "Download", "Multi-language"],
        featured: true,
        rating: 4.5,
      },

      {
        title: "CineHD",
        url: "https://cinehd.app",
        description: "Movies and Anime streaming with multi-server and multi-language support",
        category: moviesCategory._id,
        tags: ["Movies", "Anime", "Multi-server", "Multi-language"],
        featured: true,
        rating: 4.3,
      },

      {
        title: "MovieBox",
        url: "https://moviebox.pk",
        description: "Free streaming platform for Movies, Web Series and TV Shows with Hindi dubbed support",
        category: moviesCategory._id,
        tags: ["Streaming","Vast-Library", "Download" ,  "Multi-language"],
        featured: true,
        rating: 4.6,
      },


      {
        title: "Z-Library",
        url: "https://z-lib.gd", // TODO: verify URL
        description: "Free books and comics library",
        category: readingCategory._id,
        tags: ["books", "comics", "apps", "extensions"],
        featured: true,
        rating: 4,
      },


      // ⭐ Comix

      {
        title: "Comix",
        url: "https://comix.to", // TODO: verify URL
        description: "Free comics, manhwa and manga reading platform",
        category: readingCategory._id,
        tags: ["Comics", "Manhwa", "Manga", "no-login", "Online-reader"],
        featured: true,
        rating: 4.5,
      },





      {
        title: "Anker Games",
        url: "https://ankergames.net", // TODO: verify URL
        description: "Download and torrent games, pre-installed",
        category: GamingCategory._id,
        tags: ["Games", "Download", "torrent", "pre-installed"],
        featured: true,
        rating: 4,
      },
      {
        title: "Astral Games",
        url: "https://astral-games.xyz/", // TODO: verify URL
        description: "Download and torrent games, pre-installed",
        category: GamingCategory._id,
        tags: ["Games", "Download", "torrent", "pre-installed"],
        featured: true,
        rating: 4,
      },


      // Ai category

      // ⭐ Gemini
      {
        title: "Gemini",
        url: "https://gemini.google.com",
        description: "Google's AI assistant with Gemini 3.1 Pro Preview (5 daily) and Gemini 3.1 Flash Lite models",
        category: AiCategory._id,
        tags: ["Google", "Ai", "chatbot", "Multi-modal", "Image-understanding"],
        featured: true,
        rating: 4.5,
      },

      // ChatGPT
      {
        title: "ChatGPT",
        url: "https://chatgpt.com",
        description: "OpenAI's AI assistant with GPT-5.5 Instant model",
        category: AiCategory._id,
        tags: ["Open-Ai", "Ai", "chatbot", "Multimodal", "Industry-standard",
        ],
        featured: false,
        rating: 4.2,
      },

      {
        title: "Claude",
        url: "https://claude.ai",
        description: "Anthropic's AI assistant with Claude Sonnet 4.6 model. Sign-Up and Phone number required.",
        category: AiCategory._id,
        tags: ["Anthropic", "Ai", "chatbot", "Reasoning", "Long-context", "sign-up",
        ],
        featured: false,
        rating: 4.4,
      },

      // ⭐ NotebookLM
      {
        title: "NotebookLM",
        url: "https://notebooklm.google.com",
        description: "Google's AI-powered document chatbot with note-taking, slides and Anki export support",
        category: AiCategory._id,
        tags: ["Google", "Document-ai", "Note-taking", "Anki-export", "Research-tool"],
        featured: true,
        rating: 4.4,
      },

      {
        title: "DeepSeek",
        url: "https://deepseek.com",
        description: "AI assistant with V4-Pro (Expert) and V4-Flash (Instant) models, unlimited usage",
        category: AiCategory._id,
        tags: ["Ai", "chatbot", "Unlimited", "sign-up"],
        featured: true,
        rating: 4.5,
      },

      {
        title: "Google Flow",
        url: "https://flow.google.com", // TODO: verify URL
        description: "Google's powerful AI image generation suite powered by Nano Banana Pro and Nano Banana 2 — ",
        category: AiCategory._id,
        tags: ["Google", "Nano-banana-pro", "20-plus-per-day", "text-to-video", "Image-generation"],
        featured: true,
        rating: 4,
      },

      {
        title: "Z.ai",
        url: "https://chat.z.ai/",
        description: "AI assistant with GLM-5.1 and GLM-5-Turbo models, includes Slides feature",
        category: AiCategory._id,
        tags: ["Ai", "Chatbot", "sign-up", "slides", "Tone-adaptability"],
        featured: true,
        rating: 4,
      },

      {
        title: "GeminiGen AI",
        url: "https://geminigen.ai", // TODO: verify URL
        description: "Powerful AI video and image generation platform supporting top-tier models like Veo 3.1, Sora 2, Grok and Meta — ideal for high-quality Image-to-Video workflows",
        category: AiCategory._id,
        tags: ["Veo-3.1", "Sora-2", "Grok", "Meta", "Image-to-video", "login-required"],
        featured: true,
        rating: 3.8,
      },


      {
        title: "Qwen",
        url: "https://chat.qwen.ai/",
        description: "AI assistant with Qwen3.7-Max and Qwen3.7-Plus models",
        category: AiCategory._id,
        tags: ["Ai", "chatbot", "sign-up"],
        featured: true,
        rating: 4.1,
      },

      {
        title: "Kimi",
        url: "https://www.kimi.com/",
        description: "AI assistant with Kimi K2.6 (Thinking) model, includes Slides feature. Google Login or Phone number required.",
        category: AiCategory._id,
        tags: ["Ai", "chatbot", "slides", "massive-context-window", "google-login"],
        featured: true,
        rating: 3.9,
      },




      // ⭐ M3 Play
      {
        title: "M3 Play",
        url: "https://share.google/49pBUH61RaeLH4sbQ",
        description: "Music player with custom UI styles, smart queue system and Android support",
        category: musicCategory._id,
        tags: ["Music", "Custom-player-ui", "Smart-queue-System", "Android"],
        featured: true,
        rating: 4.4,
      },


      {
        title: "Class Central",
        url: "https://www.classcentral.com",
        description: "World's largest aggregator of free and paid online courses — curated from Coursera, edX, Udemy, and top universities in one searchable hub.",
        category: educationalCategory._id,
        tags: ["free-courses", "course-aggregator", "certifications", "mooc", "university-courses", "peer-reviews"],
        featured: true,
        rating: 4.5,
      },


    ]);

    console.log("Resources seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedResources();
