"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import React, { RefObject, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  setImgUrl,
  onChange,
  ref,
}: {
  setImgUrl: (t: string) => void;
  onChange: (file: File[]) => void;
  ref: RefObject<HTMLInputElement | null>;
}) => {
  const onDrop = useCallback((acceptedFiles?: File[]) => {
    if (!acceptedFiles) return;

    const filePath = URL.createObjectURL(acceptedFiles[0]);

    setImgUrl(filePath);
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} ref={ref} />
      <div className="w-full flex-center flex-col gap-2">
        <Upload size={24} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};

export default FileUploader;
