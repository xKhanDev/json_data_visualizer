import React from "react";
import Editor from "@monaco-editor/react";

interface JSONInputProps {
  onChange: (value: string) => void;
}

export const JSONInput: React.FC<JSONInputProps> = ({ onChange }) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="h-96 border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage="json"
        theme="vs"
        value=""
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: "on",
          automaticLayout: true,
          wordWrap: "on",
          bracketPairColorization: { enabled: true },
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};
