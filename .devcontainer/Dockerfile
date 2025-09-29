FROM mcr.microsoft.com/devcontainers/base:dev-ubuntu24.04 AS base

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG DEBIAN_FRONTEND=noninteractive

# ✅ Locale / Users / Paths
ENV TZ=Asia/Tokyo \
  LANG=ja_JP.UTF-8 \
  LANGUAGE=ja_JP:ja \
  LC_ALL=ja_JP.UTF-8

ENV USERNAME=vscode
ENV USER_HOME=/home/${USERNAME}
ENV USER_LOCAL=${USER_HOME}/.local
ENV USER_LOCAL_BIN=${USER_LOCAL}/bin
ENV USER_CONFIG=${USER_HOME}/.config
ENV WORK_DIR=${USER_HOME}/workspaces/androiddagashi.github.io

# ✅ XDG（mise/aqua が参照）
ENV XDG_CACHE_HOME=${USER_HOME}/.cache
ENV XDG_STATE_HOME=${USER_HOME}/.local/state
ENV MISE_CACHE_DIR=${XDG_CACHE_HOME}/mise
ENV MISE_DATA_DIR=${USER_LOCAL}/share/mise

ENV PATH="${MISE_DATA_DIR}}/shims:${USER_LOCAL_BIN}:$PATH"

USER root
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  locales sudo gnupg2 iptables ipset dnsutils gh jq vim curl ca-certificates wget \
  python3 python3-pip pipx && \
  sed -i 's/# ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
  locale-gen ja_JP.UTF-8 && \
  update-locale LANG=$LANG && \
  install -d -m 0755 -o ${USERNAME} -g ${USERNAME} \
  ${WORK_DIR} \
  ${USER_LOCAL_BIN} \
  ${USER_LOCAL}/bash_completion.d \
  ${USER_CONFIG}/.ssh \
  ${USER_CONFIG}/ksm \
  ${USER_CONFIG}/aqua \
  ${USER_HOME}/.claude \
  ${USER_HOME}/.codex \
  ${USER_HOME}/.copilot \
  ${XDG_CACHE_HOME} \
  ${XDG_CACHE_HOME}/aquaproj-aqua \
  ${MISE_CACHE_DIR} \
  ${MISE_DATA_DIR} \
  ${MISE_DATA_DIR}/installs/node \
  ${MISE_DATA_DIR}/downloads \
  ${MISE_DATA_DIR}/lockfiles \
  ${AQUA_ROOT_DIR} \
  ${AQUA_BIN} \
  ${XDG_STATE_HOME} \
  ${XDG_STATE_HOME}/mise && \
  echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} && \
  chmod 0440 /etc/sudoers.d/${USERNAME} && \
  chown -R ${USERNAME}:${USERNAME} ${USER_HOME}/.cache ${USER_LOCAL} ${USER_CONFIG} && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

COPY --chown=vscode:vscode mise.toml ${USER_CONFIG}/mise/config.toml

RUN curl https://mise.run | sh && \
  mise trust "${USER_CONFIG}/mise/config.toml" && \
  mise install

WORKDIR /workspace
