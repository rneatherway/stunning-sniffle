import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import { Button, Box } from "@primer/react";
import "./index.css";

export default function (props: FileBlockProps) {
  const { context, content, metadata } = props;

  // Extract alert information from JSON.
  const alerts: Alert[] = [];
  for (const run of JSON.parse(content).runs) {
    for (const result of run.results) {
      const message = result.message.text;
      for (const location of result.locations ?? []) {
        const codeSnippet = location.physicalLocation?.contextRegion?.snippet?.text;
        alerts.push({
          message,
          codeSnippet
        });
      }
    }
  }

  // Render alerts
  return (
    <Box p={4}>
      {
        alerts.map((alert, index) => 
          <div key={index}>
            <AlertView {...alert} />
            <p></p>
          </div>)
      }
    </Box>
  );
}


interface Alert {
  message: string;
  codeSnippet: string;
}

const AlertView = ({ message, codeSnippet }: Alert) => {
  return (
    <Box>
      <Box className="message">{message}</Box>
      {codeSnippet && (<Box paddingLeft={3}>
        <pre className="code-snippet"> 
          {codeSnippet.trim()}
        </pre>
      </Box>)}
    </Box>
  );
}