'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Memory } from '@/types/memory';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  memories: Memory[];
  onMemoryAdded: (memory: Memory) => void;
}

export default function MemoryModal({ isOpen, onClose, date, memories, onMemoryAdded }: MemoryModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caption', caption);
      formData.append('date', date.toISOString());

      const response = await fetch('/api/memories', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newMemory = await response.json();
        onMemoryAdded(newMemory);
        setCaption('');
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Error uploading memory:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{format(date, 'MMMM d, yyyy')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Write a caption..."
            />
          </div>
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Add Memory'}
          </button>
        </form>

        <div className="space-y-4">
          {memories.map((memory, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="relative h-48 mb-4">
                <Image
                  src={memory.imageUrl}
                  alt={memory.caption}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-800">{memory.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 