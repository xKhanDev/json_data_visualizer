import React from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  data: any;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
    const flattened: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (obj[key] === null || obj[key] === undefined) {
          flattened[newKey] = "";
        } else if (Array.isArray(obj[key])) {
          flattened[newKey] = JSON.stringify(obj[key]);
        } else if (typeof obj[key] === "object") {
          Object.assign(flattened, flattenObject(obj[key], newKey));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }

    return flattened;
  };

  const exportToExcel = () => {
    try {
      let worksheetData: any[] = [];

      if (Array.isArray(data)) {
        // Handle array of objects - create individual rows for each item
        worksheetData = data.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            // Flatten each object and create a row
            return flattenObject(item);
          } else {
            // For primitive values in array
            return { Index: index + 1, Value: item };
          }
        });
      } else if (typeof data === "object" && data !== null) {
        // Handle single object - check if it contains arrays that should be expanded
        const hasArrays = Object.values(data).some((value) =>
          Array.isArray(value)
        );

        if (hasArrays) {
          // Find arrays and create rows for each item
          for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                  worksheetData.push({
                    SourceArray: key,
                    Index: index + 1,
                    ...flattenObject(item),
                  });
                } else {
                  worksheetData.push({
                    SourceArray: key,
                    Index: index + 1,
                    Value: item,
                  });
                }
              });
            }
          }

          // If no array data was processed, fall back to key-value pairs
          if (worksheetData.length === 0) {
            const flattened = flattenObject(data);
            worksheetData = Object.entries(flattened).map(([key, value]) => ({
              Key: key,
              Value: value,
            }));
          }
        } else {
          // No arrays, treat as key-value pairs
          const flattened = flattenObject(data);
          worksheetData = Object.entries(flattened).map(([key, value]) => ({
            Key: key,
            Value: value,
          }));
        }
      } else {
        // Handle primitive values
        worksheetData = [{ Value: data }];
      }

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Auto-size columns
      if (worksheetData.length > 0) {
        const columnWidths = Object.keys(worksheetData[0]).map((key) => ({
          wch: Math.max(
            key.length,
            ...worksheetData.map((row) => String(row[key] || "").length)
          ),
        }));
        worksheet["!cols"] = columnWidths;
      }

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "JSON Data");

      // Generate filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      const filename = `json-export-${timestamp}.xlsx`;

      // Save the file
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export Excel file. Please try again.");
    }
  };

  return (
    <Button
      onClick={exportToExcel}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
    >
      <Download size={18} />
      Download as Excel
    </Button>
  );
};
