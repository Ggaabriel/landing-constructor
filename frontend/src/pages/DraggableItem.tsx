import React, { useState, useEffect } from 'react';

const DraggableBlock: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInDropZone, setIsInDropZone] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const newX = clientX - offset.x;
        const newY = clientY - offset.y;
        setPosition({ x: newX, y: newY });
        checkDropZone(clientX, clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (!isInDropZone) {
        // Возвращаем блок в начальное положение
        setPosition(initialPosition);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd, { passive: false });
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isInDropZone, offset, initialPosition]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const boundingBox = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: clientX - boundingBox.left,
      y: clientY - boundingBox.top,
    });
    setInitialPosition({ x: 0, y: 0 });
  };

  const checkDropZone = (clientX: number, clientY: number) => {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;
    const dropZoneRect = dropZone.getBoundingClientRect();
    const isInZone =
      clientX >= dropZoneRect.left &&
      clientX <= dropZoneRect.right &&
      clientY >= dropZoneRect.top &&
      clientY <= dropZoneRect.bottom;
    setIsInDropZone(isInZone);
  };

  return (
    <div>
      <div
        id="dropZone"
        style={{
          width: '300px',
          height: '300px',
          background: 'lightgray',
          position: 'absolute',
          top: '50px',
          left: '50px',
        }}
      >
        Drop Zone
      </div>
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '100px',
          height: '100px',
          background: 'blue',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        Drag me
      </div>
    </div>
  );
};
export default DraggableBlock;