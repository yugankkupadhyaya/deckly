'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../../../../lib/utils';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { useSlideStore } from '../../../../store/useSlideStore';

interface TableProps {
  content: string[][];
  onChange: (newContent: string[][]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  initialRowSize?: number;
  styles?: React.CSSProperties;
  initialColSize?: number;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  content,
  onChange,
  isPreview,
  isEditable,
  initialRowSize = 3,
  initialColSize = 3,
  styles,
  className,
}) => {
  const { currentTheme } = useSlideStore();

  const [tableData, setTableData] = useState<string[][]>(() => {
    if (content.length === 0 || content[0]?.length === 0) {
      return Array.from({ length: initialRowSize }, () =>
        Array.from({ length: initialColSize }, () => '')
      );
    }
    return content;
  });

  const [colSizes, setColSizes] = useState<number[]>([]);
  const [rowSizes, setRowSizes] = useState<number[]>([]);

  function handleResizeCol(index: number, newSize: number) {
    if (!isEditable) return;
    const newSizes = [...colSizes];
    newSizes[index] = newSize;
    setColSizes(newSizes);
  }
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable) return;

    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell)) : row
    );

    setTableData(newData);
    onChange(newData);
  };

  useEffect(() => {
    setRowSizes(new Array(tableData.length).fill(100 / tableData.length));
    setColSizes(new Array(tableData[0].length).fill(100 / tableData.length));
  }, [tableData]);
  /* ---------------- PREVIEW MODE ---------------- */

  if (isPreview) {
    return (
      <div>
        <table
          className={cn('w-full border-collapse table-auto border border-gray-300', className)}
          style={styles}
        >
          <thead>
            <tr>
              {tableData[0].map((cell, index) => (
                <th key={index} className="p-2" style={{ width: `${colSizes[index] || 0}%` }}>
                  {cell || 'Type Here'}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex} style={{ height: `${rowSizes[rowIndex + 1] || 0}%` }}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 border">
                    {cell || 'Type here'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* ---------------- EDIT MODE ---------------- */

  return (
    <div
      className="w-full h-full relative"
      style={{
        background: currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: '8px',
      }}
    >
      <PanelGroup
        id="rows"
        orientation="vertical"
        className={`h-full w-full rounded-lg border ${
          initialColSize === 2
            ? 'min-h-[100px]'
            : initialColSize === 3
              ? 'min-h-[150px]'
              : initialColSize === 4
                ? 'min-h-[200px]'
                : 'min-h-[100px]'
        }`}
        onLayoutChanged={(layout) => setRowSizes(Object.values(layout))}
      >
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex > 0 && <PanelResizeHandle />}

            <PanelGroup
              id={`row-${rowIndex}`}
              orientation="horizontal"
              onLayoutChanged={(layout) => setColSizes(Object.values(layout))}
              className="w-full h-full"
            >
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && <PanelResizeHandle />}

                  <Panel
                    defaultSize={colSizes[colIndex]}
                    onResize={(size) => handleResizeCol(colIndex, size.inPixels)}
                    className="w-full h-full min-h-9"
                  >
                    <div className="relative w-full h-full min-h-3">
                      <input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full h-full p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                        style={{ color: currentTheme.fontColor }}
                        placeholder="Type here "
                        readOnly={!isEditable}
                      />
                    </div>
                  </Panel>
                </React.Fragment>
              ))}
            </PanelGroup>
          </React.Fragment>
        ))}
      </PanelGroup>
    </div>
  );
};

export default Table;
