import { useCallback, useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface JsonFileDropProps {
  onFileLoad?: (jsonData: unknown, fileName: string) => void
  onError?: (error: Error) => void
  className?: string
  value?: string | null
}

const JsonFileDrop = ({
  onFileLoad,
  onError,
  className,
  value,
}: JsonFileDropProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const [internalFileName, setInternalFileName] = useState<string | null>(
    value ?? null,
  )

  // value prop이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setInternalFileName(value)
    }
  }, [value])

  const fileName = value ?? internalFileName

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const processJsonFile = useCallback(
    (file: File) => {
      setInternalFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string)
          onFileLoad?.(jsonData, file.name)
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error : new Error('Invalid JSON file')
          console.error('Invalid JSON file:', errorMessage)
          onError?.(errorMessage)
          setInternalFileName(null)
        }
      }
      reader.readAsText(file)
    },
    [onFileLoad, onError],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      const jsonFile = files.find(
        (file) =>
          file.type === 'application/json' || file.name.endsWith('.json'),
      )

      if (jsonFile) {
        processJsonFile(jsonFile)
      } else {
        const error = new Error('JSON 파일만 업로드할 수 있습니다.')
        onError?.(error)
      }
    },
    [processJsonFile, onError],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        if (
          file.type === 'application/json' || file.name.endsWith('.json')
        ) {
          processJsonFile(file)
        } else {
          const error = new Error('JSON 파일만 업로드할 수 있습니다.')
          onError?.(error)
          e.target.value = ''
        }
      }
    },
    [processJsonFile, onError],
  )

  return (
    <Card
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative cursor-pointer border-2 border-dashed transition-colors',
        isDragging
          ? 'border-primary bg-primary/10'
          : 'border-muted-foreground/25 hover:border-primary/50',
        className,
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleFileInput}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
          id="json-file-input"
        />
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium">
            {fileName
              ? fileName
              : 'JSON 파일을 드롭하거나 클릭하여 선택하세요'}
          </p>
          <p className="text-xs text-muted-foreground">
            JSON 파일만 업로드할 수 있습니다
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export { JsonFileDrop }

