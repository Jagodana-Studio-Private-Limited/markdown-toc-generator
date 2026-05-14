"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Check, AlignLeft, List, Hash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToolEvents } from "@/lib/analytics";

const SAMPLE_MARKDOWN = `# Getting Started

## Installation

### Prerequisites

### Install via npm

## Configuration

### Basic Setup

### Advanced Options

## Usage

### Quick Start

### Examples

#### Basic Example

#### Advanced Example

## API Reference

### Methods

### Types

## Contributing

## License`;

interface Heading {
  level: number;
  text: string;
  anchor: string;
}

function makeAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_[\]()~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-");
}

function parseHeadings(markdown: string): Heading[] {
  return markdown
    .split("\n")
    .flatMap((line) => {
      const m = line.match(/^(#{1,6})\s+(.+)$/);
      if (!m) return [];
      const text = m[2].trim();
      return [{ level: m[1].length, text, anchor: makeAnchor(text) }];
    });
}

function generateTOC(
  headings: Heading[],
  minLevel: number,
  maxLevel: number,
  ordered: boolean
): string {
  const filtered = headings.filter(
    (h) => h.level >= minLevel && h.level <= maxLevel
  );
  if (filtered.length === 0) return "";
  const base = Math.min(...filtered.map((h) => h.level));
  return filtered
    .map((h) => {
      const indent = "  ".repeat(h.level - base);
      const bullet = ordered ? "1." : "-";
      return `${indent}${bullet} [${h.text}](#${h.anchor})`;
    })
    .join("\n");
}

export function MarkdownTocGeneratorTool() {
  const [input, setInput] = useState(SAMPLE_MARKDOWN);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(6);
  const [ordered, setOrdered] = useState(false);
  const [copied, setCopied] = useState(false);

  const headings = useMemo(() => parseHeadings(input), [input]);
  const toc = useMemo(
    () => generateTOC(headings, minLevel, maxLevel, ordered),
    [headings, minLevel, maxLevel, ordered]
  );

  const headingCount = headings.filter(
    (h) => h.level >= minLevel && h.level <= maxLevel
  ).length;

  const handleCopy = useCallback(() => {
    if (!toc) {
      toast.error("Nothing to copy — add some headings first.");
      return;
    }
    navigator.clipboard
      .writeText(toc)
      .then(() => {
        setCopied(true);
        toast.success("TOC copied to clipboard!");
        ToolEvents.resultCopied();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast.error("Copy failed — please select and copy manually."));
  }, [toc]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setMinLevel(v);
    if (v > maxLevel) setMaxLevel(v);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setMaxLevel(v);
    if (v < minLevel) setMinLevel(v);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-4 rounded-xl bg-muted/40 border border-border/50">
        {/* Min level */}
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Min H
          </span>
          <input
            type="range"
            min={1}
            max={6}
            value={minLevel}
            onChange={handleMinChange}
            className="w-24 accent-brand"
            aria-label="Minimum heading level"
          />
          <span className="text-sm font-mono font-semibold text-brand w-4">
            {minLevel}
          </span>
        </div>

        {/* Max level */}
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Max H
          </span>
          <input
            type="range"
            min={1}
            max={6}
            value={maxLevel}
            onChange={handleMaxChange}
            className="w-24 accent-brand"
            aria-label="Maximum heading level"
          />
          <span className="text-sm font-mono font-semibold text-brand w-4">
            {maxLevel}
          </span>
        </div>

        {/* Ordered toggle */}
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">List style:</span>
          <button
            type="button"
            onClick={() => setOrdered((o) => !o)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 ${
              ordered ? "bg-brand" : "bg-muted-foreground/30"
            }`}
            aria-label="Toggle ordered list"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                ordered ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-foreground">
            {ordered ? "Ordered (1.)" : "Unordered (-)"}
          </span>
        </div>

        {/* Heading count badge */}
        <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20">
          <AlignLeft className="h-3.5 w-3.5 text-brand" />
          <span className="text-xs font-medium text-brand">
            {headingCount} heading{headingCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Two-column editor */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-sm font-medium text-muted-foreground">
              Markdown Input
            </span>
            <button
              type="button"
              onClick={() => setInput("")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Paste your Markdown here...&#10;&#10;## Section One&#10;&#10;### Sub-section&#10;&#10;## Section Two"
            className="flex-1 min-h-[420px] w-full rounded-xl border border-border/60 bg-background p-4 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/50 transition-colors placeholder:text-muted-foreground/50"
            aria-label="Markdown input"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-sm font-medium text-muted-foreground">
              Generated TOC
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              disabled={!toc}
              className="gap-1.5 h-7 text-xs border-brand/30 hover:bg-brand/10 hover:text-brand hover:border-brand/50"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied!" : "Copy TOC"}
            </Button>
          </div>
          <div
            className={`flex-1 min-h-[420px] rounded-xl border p-4 font-mono text-sm overflow-auto transition-colors ${
              toc
                ? "border-border/60 bg-muted/20"
                : "border-dashed border-border/40 bg-muted/10"
            }`}
          >
            {toc ? (
              <pre className="whitespace-pre-wrap break-words text-foreground leading-relaxed">
                {toc}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-muted-foreground/60">
                <AlignLeft className="h-8 w-8" />
                <p className="text-sm">
                  {input.trim()
                    ? "No headings match the selected depth range."
                    : "Paste your Markdown on the left to generate a TOC."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tip */}
      <p className="mt-4 text-center text-xs text-muted-foreground/60">
        100% client-side — your content never leaves your browser.
      </p>
    </motion.div>
  );
}
