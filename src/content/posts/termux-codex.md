---
title: Termux 安装 Codex 并配置 GLM-4.7-Flash 模型实录
published: 2026-10-17 08:38:00
description: 介绍了如何使用 DioNanos/codex-termux 项目在 Termux 上安装 Codex
tags:
  - Termux
  - 终端
  - Agent
category: 终端
draft: false
lang: zh-CN
---

最近想给 Termux 安装 Codex 来写代码，在这里记录一下安装过程。

## 安装

这里使用 `DioNanos/codex-termux` 项目，使用 `Bun` 作为包管理器。:spoiler[你应该不知道 Termux 已经支持 Bun 了吧]

::github{repo="DioNanos/codex-termux"}

如果没有安装 `Bun`，先安装。

```plain
bash
pkg update
pkg upgrade -y
pkg i bun
```

然后安装 `DioNanos/codex-termux` 项目提供的 npm 包。

```plain
bash
bun install -g @mmmbuto/codex-cli-termux@latest --allow-scripts=@mmmbuto/codex-cli-termux
```

似乎需要下载二进制包，可能需要比较久的时间。

根据项目的文档，Termux 需要安装 `ripgrep`。（但是我这里不需要，可能是因为之前安装过了）

> On Termux, also install ripgrep (the Android package resolves rg from PATH and does not bundle it):

```plain
bash
pkg install ripgrep
```

安装完成后，`bun` 提示需要添加环境变量。（由于环境不同，你的提示可能与这个不同）

```plain
bash
export PATH="/data/data/com.termux/files/home/.bun/bin:$PATH"
```

添加后即可使用。输入 `codex --version` 验证。输出类似

```plain
codex-cli 0.162.1
```

即表明安装成功。需要注意的是，我们要将这一环境变量添加至 `.bashrc` 或 `.zshrc`，否则每次启动 Termux 都需要重新导入一遍环境变量。

```plain
bash
echo 'export PATH="/data/data/com.termux/files/home/.bun/bin:$PATH"' >> ~/.bashrc # 或 ~/.zshrc，注意 'export ...' 一句应替换为你的实际提示
```

重启 Termux，输入 `codex --version` 查看配置是否生效。

## 配置模型

新建或编辑 `~/.codex/models.json`。

```plain
json title="~/.codex/models.json"
{
  "models": [
    {
      "slug": "glm-4.7-flash",
      "display_name": "glm-4.7-flash",
      "description": "Z.ai's 30B SOTA model for Agentic Coding",
      "default_reasoning_level": "max",
      "supported_reasoning_levels": [
        { "effort": "low", "description": "Light reasoning" },
        { "effort": "high", "description": "Enhanced reasoning" },
        { "effort": "max", "description": "Deep reasoning" }
      ],
      "shell_type": "shell_command",
      "visibility": "list",
      "supported_in_api": true,
      "priority": 0,
      "base_instructions": "",
      "supports_reasoning_summaries": true,
      "default_reasoning_summary": "none",
      "support_verbosity": false,
      "apply_patch_tool_type": "freeform",
      "truncation_policy": { "mode": "bytes", "limit": 10000 },
      "context_window": 200000,
      "max_context_window": 200000,
      "effective_context_window_percent": 95,
      "supports_parallel_tool_calls": true,
      "experimental_supported_tools": [],
      "input_modalities": ["text"]
    }
  ]
}
```

新建或编辑 `~/.codex/config.toml`。

```plain
toml title="~/.codex/config.toml"
model_provider = "ZAI"
model = "glm-4.7-flash"
model_reasoning_effort = "max"
model_catalog_json = "~/.codex/models.json"

[model_providers.ZAI]
name = "ZAI"
base_url = "https://open.bigmodel.cn/api/v1"
experimental_bearer_token = "你的API Key"
wire_api = "responses"
# 重试参数
stream_max_retries = 10
request_max_retries = 5
```

配置完成后，启动或重启 Codex（如果你已经启动了的话）。

如果配置无误，你现在应该可以发送「你好」并获得回答了。

![效果](/images/termux-codex/result.webp)
