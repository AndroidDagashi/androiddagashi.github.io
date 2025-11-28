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
ENV WORK_DIR=${USER_HOME}/workspace

# XDG(referenced by mise/aqua)
ENV XDG_CACHE_HOME=${USER_HOME}/.cache
ENV XDG_STATE_HOME=${USER_HOME}/.local/state

# mise
ENV MISE_CACHE_DIR=${XDG_CACHE_HOME}/mise
ENV MISE_DATA_DIR=${USER_LOCAL}/share/mise
ENV MISE_SHIMS_DIR=${MISE_DATA_DIR}/shims

# aqua
ENV AQUA_ROOT_DIR=${USER_HOME}/.local/share/aquaproj-aqua
ENV AQUA_BIN=${AQUA_ROOT_DIR}/bin
ENV AQUA_CONFIG=${USER_CONFIG}/aqua/aqua.yaml

# Claude Code
ENV CLAUDE_CONFIG_DIR=${USER_CONFIG}/claude

ENV PATH=${AQUA_BIN}:${USER_LOCAL_BIN}:$PATH

ENV PATH=${MISE_SHIMS_DIR}:${USER_LOCAL_BIN}:$PATH

USER root
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  locales sudo gh jq vim curl ca-certificates wget && \
  sed -i 's/# ja_JP.UTF-8 UTF-8/ja_JP.UTF-8 UTF-8/' /etc/locale.gen && \
  locale-gen ja_JP.UTF-8 && \
  update-locale LANG=$LANG && \
  install -d -m 0755 -o ${USERNAME} -g ${USERNAME} \
  ${WORK_DIR} \
  ${USER_LOCAL_BIN} \
  ${USER_LOCAL}/bash_completion.d \
  ${USER_CONFIG}/.ssh \
  ${USER_CONFIG}/aqua \
  $(USER_CONFIG)/gh \
  ${USER_CONFIG}/claude \
  ${USER_HOME}/.claude \
  ${USER_HOME}/.codex \
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
WORKDIR ${USER_HOME}

# mise
COPY --chown=vscode:vscode .devcontainer/mise/config.toml ${USER_CONFIG}/mise/config.toml
RUN curl https://mise.run | sh

# aqua
COPY --chown=vscode:vscode .devcontainer/aqua/aqua.yaml ${USER_CONFIG}/aqua/aqua.yaml
RUN curl -sSfL -O https://raw.githubusercontent.com/aquaproj/aqua-installer/v4.0.2/aqua-installer && \
  echo "98b883756cdd0a6807a8c7623404bfc3bc169275ad9064dc23a6e24ad398f43d  aqua-installer" | sha256sum -c - && \
  chmod +x aqua-installer && \
  ./aqua-installer


WORKDIR ${WORK_DIR}
