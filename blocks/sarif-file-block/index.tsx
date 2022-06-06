import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import "./index.css";

export default function (props: FileBlockProps) {
  const { context, content, metadata } = props;

  const alerts = [];
  for (const run of JSON.parse(content).runs) {
    for (const result of run.results) {
      alerts.push(result.message.text);
    }
  }

  return (
    <Box p={4}>
      {
        alerts.map(a => <Box p={2}><pre>{a}</pre></Box>)
      }
    </Box>
  );
}