{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  packages = [
    pkgs.bore-cli
  ];

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
    TUNNEL_PORT = "55125";
  };

  # 4. Background Processes (Triggered with `devenv up`)
  processes = {
    svelte-dev.exec = "bun run dev --port $PORT";
    bore-tunnel.exec = "bore local $PORT --to bore.pub --port $TUNNEL_PORT";
  };

  # 5. Enter Shell Hook (Runs immediately when entering the shell environment)
  enterShell = ''
    echo "⚡ Bun-SvelteKit Dev Environment Active ⚡"
    bun --version

    # Display the final URL
    BORE_URL=$(devenv processes logs bore-tunnel 2>/dev/null | grep -oE 'listening at [a-zA-Z0-9.-]+:[0-9]+' | tail -n 1 | sed 's/listening at /http:\/\//')
    if [ -n "$BORE_URL" ]; then
      echo "🔗 Access your app here: $BORE_URL"
    else
      echo "🔗 Bore tunnel is not running. Start it with 'devenv up'."
    fi
  '';
}
