'use client';

import { FC, useState, useRef, DragEvent, ChangeEvent } from 'react';
import s from './Dropzone.module.css';
import cn from 'clsx';
import { Text } from '@components/ui';

export interface DropzoneProps {
  onChange: (files: FileList) => void;
  width?: string | number;
  style?: {};
}

const Dropzone: FC<DropzoneProps> = ({ width, style = {}, onChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files);
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onDragEnter={handleDrag}
      className={s.root}
      style={{
        width,
        ...style
      }}
    >
      <input
        id="input-file-upload"
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleUpload}
      />
      <label
        className={cn(s.card, { [s.dragActive]: dragActive })}
        htmlFor="input-file-upload"
      >
        <button className="upload-button" onClick={onButtonClick}>
          <Text>Click to Upload</Text>
        </button>
      </label>
      {dragActive && (
        <div
          className={s.activeDragDrop}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
};

export default Dropzone;
