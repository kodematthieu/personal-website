{ pkgs, lib, config, inputs, ... }:

{
  # 1. Declarative Language Runtimes
  languages = {
    javascript = {
      enable = true;
      
      # Enables Bun as the primary runtime & package manager
      bun = {
        enable = true;
        install.enable = true; # Automatically runs 'bun install' on environment setup
      };
    };
    typescript.enable = true;
  };

  # 3. Environment Variables
  env = {
    PORT = "5173";
  };

  # 4. Background Processes (Triggered with `devenv up`)
  processes = {
    svelte-dev.exec = "bun run dev --port $PORT";
  };

  # 5. Enter Shell Hook (Runs immediately when entering the shell environment)
  enterShell = ''
    echo "⚡ Bun-SvelteKit Dev Environment Active ⚡"
    bun --version
  '';
}