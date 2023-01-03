'use client';

import { FC, useState, useRef, DragEvent, ChangeEvent } from 'react';
import s from './Dropzone.module.css';
import cn from 'clsx';
import { Text } from '@components/ui';

export interface DropzoneProps {
  width?: number;
  style?: {};
  handleChange: (files: FileList) => void;
}

const Dropzone: FC<DropzoneProps> = ({ width, style = {}, handleChange }) => {
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
      handleChange(e.dataTransfer.files);
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      onClick={onButtonClick}
      className={s.container}
      style={{
        width,
        ...style
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        onChange={handleUpload}
        id="input-file-upload"
      />
      <label
        htmlFor="input-file-upload"
        className={cn(s.dropzone, { [s.dragActive]: dragActive })}
      >
        <Text
          style={{
            fontSize: '1rem',
            fontWeight: 600
          }}
        >
          Click to Upload
        </Text>
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
