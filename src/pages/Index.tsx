import React, { useState, useCallback } from "react";
import { JSONInput } from "@/components/JSONInput";
import { TableView } from "@/components/TableView";
import { ExportButton } from "@/components/ExportButton";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValidJson, setIsValidJson] = useState(false);

  const handleJsonChange = useCallback((value: string) => {
    try {
      if (value.trim() === "") {
        setJsonData(null);
        setError(null);
        setIsValidJson(false);
        return;
      }

      const parsed = JSON.parse(value);
      setJsonData(parsed);
      setError(null);
      setIsValidJson(true);
    } catch (err) {
      setError("Invalid JSON format. Please check your syntax.");
      setIsValidJson(false);
      setJsonData(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6">
            <ErrorAlert message={error} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* JSON Input Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                JSON Input
              </h2>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isValidJson ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {isValidJson ? "Valid JSON" : "Enter JSON"}
                </span>
              </div>
            </div>
            <JSONInput onChange={handleJsonChange} />
          </Card>

          {/* Table View Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Table View
              </h2>
              {isValidJson && <ExportButton data={jsonData} />}
            </div>
            <div className="min-h-[400px]">
              {jsonData ? (
                <TableView data={jsonData} />
              ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">No Data to Display</p>
                    <p className="text-sm mt-1">
                      Enter valid JSON to see the table view
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sample JSON Section */}
        <Card className="mt-6 p-6 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Try Sample JSON
          </h3>
          <p className="text-gray-600 mb-4">
            Copy and paste this sample JSON to test the visualizer:
          </p>
          <pre className="bg-white p-4 rounded-lg border text-sm overflow-x-auto">
            {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipcode": "10001"
      }
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "address": {
        "street": "456 Oak Ave",
        "city": "Los Angeles",
        "zipcode": "90210"
      }
    }
  ]
}`}
          </pre>
        </Card>
      </div>
    </div>
  );
};

export default Index;
