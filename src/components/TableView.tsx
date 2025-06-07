import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TableViewProps {
  data: any;
}

interface TableRowProps {
  item: any;
  index: number;
  isNested?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  index,
  isNested = false,
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleExpand = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  const renderValue = (value: any, key: string, rowKey: string) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">null</span>;
    }

    if (typeof value === "boolean") {
      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value.toString()}
        </span>
      );
    }

    if (typeof value === "number") {
      return <span className="text-blue-600 font-mono">{value}</span>;
    }

    if (typeof value === "string") {
      return <span className="text-gray-900">{value}</span>;
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedRows.has(rowKey);
      return (
        <div>
          <button
            onClick={() => toggleExpand(rowKey)}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium"
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            Array ({value.length} items)
          </button>
          {isExpanded && (
            <div className="mt-2 ml-4 border-l-2 border-gray-200 pl-4">
              {value.map((arrayItem, arrayIndex) => (
                <div key={arrayIndex} className="mb-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium text-gray-500">
                    Item {arrayIndex}
                  </span>
                  {typeof arrayItem === "object" && arrayItem !== null ? (
                    <div className="mt-1">
                      {Object.entries(arrayItem).map(([objKey, objValue]) => (
                        <div key={objKey} className="flex gap-2 text-sm">
                          <span className="font-medium text-gray-700">
                            {objKey}:
                          </span>
                          <span>
                            {renderValue(
                              objValue,
                              objKey,
                              `${rowKey}-${arrayIndex}-${objKey}`
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="ml-2">
                      {renderValue(arrayItem, "", `${rowKey}-${arrayIndex}`)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === "object") {
      const isExpanded = expandedRows.has(rowKey);
      return (
        <div>
          <button
            onClick={() => toggleExpand(rowKey)}
            className="flex items-center gap-1 text-purple-600 hover:text-purple-800 font-medium"
          >
            {isExpanded ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            Object ({Object.keys(value).length} keys)
          </button>
          {isExpanded && (
            <div className="mt-2 ml-4 border-l-2 border-gray-200 pl-4">
              {Object.entries(value).map(([objKey, objValue]) => (
                <div key={objKey} className="flex gap-4 py-1">
                  <span className="font-medium text-gray-700 min-w-0 flex-shrink-0">
                    {objKey}:
                  </span>
                  <div className="flex-1 min-w-0">
                    {renderValue(objValue, objKey, `${rowKey}-${objKey}`)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span>{String(value)}</span>;
  };

  if (typeof item !== "object" || item === null) {
    return (
      <tr className={isNested ? "bg-gray-50" : ""}>
        <td className="px-4 py-2 border-b text-sm font-medium text-gray-500">
          {index}
        </td>
        <td className="px-4 py-2 border-b text-sm">
          {renderValue(item, "", `row-${index}`)}
        </td>
      </tr>
    );
  }

  const keys = Object.keys(item);

  return (
    <tr className={isNested ? "bg-gray-50" : ""}>
      <td className="px-4 py-2 border-b text-sm font-medium text-gray-500">
        {index}
      </td>
      {keys.map((key) => (
        <td key={key} className="px-4 py-2 border-b text-sm">
          {renderValue(item[key], key, `row-${index}-${key}`)}
        </td>
      ))}
    </tr>
  );
};

export const TableView: React.FC<TableViewProps> = ({ data }) => {
  if (!data) return null;

  // Handle array data
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Empty array</p>
        </div>
      );
    }

    // Get all unique keys from all objects in the array
    const allKeys = new Set<string>();
    data.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach((key) => allKeys.add(key));
      }
    });

    const keys = Array.from(allKeys);

    return (
      <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Index
              </th>
              {keys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <TableRow key={index} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle object data
  if (typeof data === "object") {
    const entries = Object.entries(data);

    return (
      <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map(([key, value], index) => (
              <tr key={key}>
                <td className="px-4 py-2 border-b text-sm font-medium text-gray-700">
                  {key}
                </td>
                <td className="px-4 py-2 border-b text-sm">
                  <TableRow item={value} index={index} isNested />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Handle primitive data
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">Primitive value:</span>
      <div className="mt-2 p-2 bg-white rounded border">{String(data)}</div>
    </div>
  );
};
