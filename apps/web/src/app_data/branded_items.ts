// How to add a new branded item:
// 1. Say I want to add "Hugging Face" logo.
// 2. I go to https://svgl.app and search for "Hugging Face" on the search bar.
// 3. I click on the first result and save the SVG to my local machine.
// 4. I rename the file to "huggingface.svg" and save it to the "public/svgs" folder.
// 5. I add the following to the brandedItems object:
//    "HUGGINGFACE": {
//      displayName: "Hugging Face",
//      logoUrl: "/huggingface.svg",
//    },

type BrandedItem = {
  displayName: string;
  logoUrl: string;
};

export const brandedItems = {
  REACT: {
    displayName: "React",
    logoUrl: "/react_dark.svg",
  },
  GOLANG: {
    displayName: "Go",
    logoUrl: "/go.svg",
  },
  PYTHON: {
    displayName: "Python",
    logoUrl: "/python.svg",
  },
  CONVEX: {
    displayName: "Convex",
    logoUrl: "/convex.svg",
  },
  POSTGRESQL: {
    displayName: "PostgreSQL",
    logoUrl: "/postgresql.svg",
  },
  TAITOUNITED: {
    displayName: "Taito United Oy",
    logoUrl: "/taitounited.svg",
  },
  PIONBLANC: {
    displayName: "Pion Blanc Oy",
    logoUrl: "/pionblanc.svg",
  },
  POLYCON: {
    displayName: "Polycon Oy",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/fc39eaeb27044bec9290363ccc17e643.png",
  },
  SEMANTUM: {
    displayName: "Semantum Oy",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/16655070d3ad450a85959f8bc7b8db2d.png?BG=110",
  },
  AALTOSCI: {
    displayName: "Aalto University School of Science",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/86946a2d15ff4442b3c0e4b6a8b8d8c9.png?BG=75",
  },
  KAIST: {
    displayName: "Korea Advanced Institute of Science and Technology (KAIST)",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/c1eb00569d58459ca9360a859bbec303.png?BG=80",
  },
  DELPHI: {
    displayName: "Delphi",
    logoUrl: "/delphi.svg",
  },
  MSSQLSERVER: {
    displayName: "Microsoft SQL Server",
    logoUrl: "/sql-server.svg",
  },
  JAVA: {
    displayName: "Java",
    logoUrl: "/java.svg",
  },
  VSCODE: {
    displayName: "Visual Studio Code",
    logoUrl: "/vscode.svg",
  },
  ANDROIDSTUDIO: {
    displayName: "Android Studio",
    logoUrl: "/androidstudio.svg",
  },
  REDUX: {
    displayName: "Redux",
    logoUrl: "/redux.svg",
  },
  SOURCETREE: {
    displayName: "Sourcetree",
    logoUrl: "/sourcetree.svg",
  },
  GITLAB: {
    displayName: "Gitlab",
    logoUrl: "/gitlab.svg",
  },
  GIT: {
    displayName: "Git",
    logoUrl: "/git.svg",
  },
  RADSTUDIO: {
    displayName: "RAD Studio",
    logoUrl: "/radstudio.svg",
  },
  SQL: {
    displayName: "SQL",
    logoUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsubstackcdn.com%2Fimage%2Ffetch%2Ff_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep%2Fhttps%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F85be1fac-45e8-4f67-88d0-cc3d042fbd01_935x935.png&f=1&nofb=1&ipt=4843986c2d499092d931f4ff467356dd3c2bfdcd9e8425aa171d0a71ac7959d7&ipo=images",
  },
  VITE: {
    displayName: "Vite",
    logoUrl: "/vite.svg",
  },
  VITE_OLD: {
    displayName: "Vite",
    logoUrl:
      "https://img.icons8.com/?size=100&id=dJjTWMogzFzg&format=png&color=000000",
  },
  NODEJS_OLD: {
    displayName: "Node.js",
    logoUrl: "/nodedotjs.svg",
  },
  HTML: {
    displayName: "HTML",
    logoUrl: "/html.svg",
  },
  CSS: {
    displayName: "CSS",
    logoUrl: "/css.svg",
  },
  TAILWIND: {
    displayName: "Tailwind CSS",
    logoUrl: "/tailwindcss.svg",
  },
  JAVASCRIPT: {
    displayName: "Javascript",
    logoUrl: "/javascript.svg",
  },
  TYPESCRIPT: {
    displayName: "Typescript",
    logoUrl: "/typescript.svg",
  },
  PYQT4: {
    displayName: "PyQT 4",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/a48383689ac44f1395c566eccd92c181.png",
  },
  TKINTER: {
    displayName: "Tkinter",
    logoUrl: "https://wingware.com/images/large-feather.png",
  },
  PANDAS: {
    displayName: "Pandas",
    logoUrl: "https://pandas.pydata.org/static/img/pandas_mark.svg",
  },
  VERCEL: {
    displayName: "Vercel",
    logoUrl: "/vercel.svg",
  },
  SHADCN: {
    displayName: "shadcn/ui",
    logoUrl: "/shadcnui.svg",
  },
  LATEX_OLD: {
    displayName: "LaTeX",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/92/LaTeX_logo.svg",
  },
  FORTRAN: {
    displayName: "Fortran",
    logoUrl: "/fortran.svg",
  },
  FLASK_OLD: {
    displayName: "Flask",
    logoUrl: "/flask.svg",
  },
  HASKELL: {
    displayName: "Haskell",
    logoUrl: "/haskell.svg",
  },
  HETZNER: {
    displayName: "Hetzner",
    logoUrl: "/hetzner.svg",
  },
  AUTH0: {
    displayName: "Auth0",
    logoUrl: "/auth0.svg",
  },
  CLOUDFLARE: {
    displayName: "Cloudflare",
    logoUrl: "/cloudflare.svg",
  },
  CHATGPT: {
    displayName: "ChatGPT",
    logoUrl: "/openai.svg",
  },
  CLAUDE: {
    displayName: "Claude",
    logoUrl: "/claude.svg",
  },
  V0: {
    displayName: "V0",
    logoUrl:
      "https://img.stackshare.io/service/145352/default_18b7775bbad27a164cbe774b72f2dbafd8676289.png",
  },
  ZUSTAND: {
    displayName: "Zustand",
    logoUrl:
      "https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg",
  },
  DOCKER: {
    displayName: "Docker",
    logoUrl: "/docker.svg",
  },
  SUBLIME: {
    displayName: "Sublime text",
    logoUrl: "/sublime.svg",
  },
  SQLALCHEMY: {
    displayName: "SQLAlchemy",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/SQLAlchemy.svg/1920px-SQLAlchemy.svg.png",
  },
  NGINX: {
    displayName: "Nginx",
    logoUrl: "/nginx.svg",
  },
  GUNICORN: {
    displayName: "Gunicorn",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/3418d4bd32aa468d82f1f79ddd550945.png",
  },
  LECHAT: {
    displayName: "Le Chat",
    logoUrl: "/mistral.svg",
  },
  DEEPSEEK: {
    displayName: "Deepseek",
    logoUrl: "/deepseek.svg",
  },
  HUGGINGFACE: {
    displayName: "Hugging Face",
    logoUrl: "/huggingface.svg",
  },
  JWT: {
    displayName: "JSON Web Token",
    logoUrl: "/jwt.svg",
  },
  SVELTE: {
    displayName: "Svelte",
    logoUrl: "/svelte.svg",
  },
  SVELTEKIT: {
    displayName: "SvelteKit",
    logoUrl: "/sveltekit.svg",
  },
  LUA: {
    displayName: "Lua",
    logoUrl: "/lua.svg",
  },
  REDIS: {
    displayName: "Redis",
    logoUrl: "/redis.svg",
  },
  REDISEARCH: {
    displayName: "RediSearch",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/5d58ee9c16804d3aa79751c103538ad3.svg",
  },
  REDISJSON: {
    displayName: "RedisJSON",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/af0c169f9566447f9a2a594a45cb9659.svg",
  },
  AWS: {
    displayName: "AWS",
    logoUrl: "/aws.svg",
  },
  EC2: {
    displayName: "EC2",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9vVTDosC-AsWLprepTOyXhkzAKji4DcJCA&s",
  },
  LINUX: {
    displayName: "Linux",
    logoUrl: "/linux.svg",
  },
  UBUNTU: {
    displayName: "Ubuntu",
    logoUrl: "/ubuntu.svg",
  },
  GITKRAKEN: {
    displayName: "GitKraken",
    logoUrl: "https://cdn.worldvectorlogo.com/logos/gitkraken.svg",
  },
  INFLUXDB: {
    displayName: "InfluxDB",
    logoUrl: "/influxdb.svg",
  },
  QUANTUMESPRESSO: {
    displayName: "Quantum ESPRESSO",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/6fdcfadd8969466fb28b638f0e93dcea.png",
  },
  CASINO: {
    displayName: "CASINO",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/a0144212e48c4ed19ccafd451b3fc861.png",
  },
  CSCMAHTI: {
    displayName: "CSC Mahti",
    logoUrl:
      "https://e7.pngegg.com/pngimages/796/388/png-clipart-kajaani-university-of-applied-sciences-csc-it-center-for-science-physics-information-technology-science-purple-angle-thumbnail.png",
  },
  MATLAB: {
    displayName: "Matlab",
    logoUrl: "/matlab.svg",
  },
  GITHUB: {
    displayName: "Github",
    logoUrl: "/github.svg",
  },
  GITHUBCOPILOT: {
    displayName: "Github Co-Pilot",
    logoUrl: "/githubcopilot.svg",
  },
  EMACS: {
    displayName: "Emacs",
    logoUrl: "/gnuemacs.svg",
  },
  OVERLEAF: {
    displayName: "Overleaf",
    logoUrl: "/overleaf.svg",
  },
  DEBIAN: {
    displayName: "Debian",
    logoUrl: "/debian.svg",
  },
  SQLITE: {
    displayName: "SQLite",
    logoUrl: "/sqlite.svg",
  },
  VANILLAJS: {
    displayName: "Vanilla Javascript",
    logoUrl: "/vanillajs.svg",
  },
  NEXTJS: {
    displayName: "NextJS",
    logoUrl: "/nextjs.svg",
  },
  CURSOR_OLD: {
    displayName: "Cursor",
    logoUrl:
      "https://registry.npmmirror.com/@lobehub/icons-static-png/1.44.0/files/light/cursor.png",
  },
  CURSOR: {
    displayName: "Cursor",
    logoUrl: "/cursor.svg",
  },
  GIN: {
    displayName: "Gin",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/a693b744847e41b2b17ffdc158ec1e3c.png",
  },
  BASH: {
    displayName: "Bash",
    logoUrl: "/bash.svg",
  },
  VIM: {
    displayName: "Vim",
    logoUrl: "/vim.svg",
  },
  VUE: {
    displayName: "Vue",
    logoUrl: "/vue.svg",
  },
  GITHUBACTIONS: {
    displayName: "Github Actions",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/370b9fb8d56e42a9a4f72492fbcfc704.png?BG=110",
  },
  ECR: {
    displayName: "ECR",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/9031b33d52594215927e9c58a466d1a1.svg",
  },
  APPRUNNER: {
    displayName: "App Runner",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/83aace0360c5473eaa54dfcd9f9951bf.svg",
  },
  DOCKERHUB: {
    displayName: "DockerHub",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/2fc354a1812b4381a63781de7c10cdf2.png",
  },
  AZURE: {
    displayName: "Azure",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/9db8a57590ba4db8b207a245a27e8fee.svg",
  },
  AZUREVM: {
    displayName: "Azure VM",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/0dca5e734fc2450496f547de7c832252.png",
  },
  BUN: {
    displayName: "Bun",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/7a8e6adcca034e8586c781331466126e.svg",
  },
  CADDY: {
    displayName: "Caddy",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/da62e98a682d41a6a30792b23832a827.png",
  },
  WATCHTOWER: {
    displayName: "Watchtower",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/985e8889aea14e9ca10b9d8e43b1f238.png",
  },
  CLERK: {
    displayName: "Clerk",
    logoUrl:
      "https://images.seeklogo.com/logo-png/65/1/clerk-icon-logo-png_seeklogo-653484.png",
  },
  NEON: {
    displayName: "Neon",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/92abe4a3d3044ceeada95e723841f24a.svg",
  },
  STRIPE: {
    displayName: "Stripe",
    logoUrl: "/stripe.svg",
  },
  SPRINGBOOT: {
    displayName: "Spring Boot",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/3a7eff2c116746669a6f4bdd4f385c9b.png",
  },
  GCP: {
    displayName: "Google Cloud",
    logoUrl: "/gcp.svg",
  },
  GRAPHQL: {
    displayName: "GraphQL",
    logoUrl: "/graphql.svg",
  },
  DRIZZLE: {
    displayName: "Drizzle",
    logoUrl: "/drizzle.svg",
  },
  PANDACSS: {
    displayName: "Panda CSS",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/8521fa58d3564909b80b6e8bab3a5ba7.png",
  },
  UIKIT: {
    displayName: "UIKit",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/45d32c065c5145caa524d5c7313282ea.svg",
  },
  KEYCLOAK: {
    displayName: "Keycloak",
    logoUrl: "/keycloak.svg",
  },
  KUBERNETES: {
    displayName: "Kubernetes",
    logoUrl: "/kubernetes.svg",
  },
  PLAYWRIGHT: {
    displayName: "Playwright",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/0157135f48564e8f959640bd4b44d009.png",
  },
  T3CHAT: {
    displayName: "T3 Chat",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/933ff9a2872c4015b3e3c749d9ccea48.png",
  },
  MCP: {
    displayName: "MCP",
    logoUrl:
      "https://picapi.janharkonen.fi/api/pics/d659304038da4889975eecdb7a0aa31a.png",
  },
  ASTRO: {
    displayName: "Astro",
    logoUrl: "/astro.svg",
  },
} satisfies Record<string, BrandedItem>;

export type BrandedItemKey = keyof typeof brandedItems;
export default brandedItems;
