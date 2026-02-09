import type {MediaItem} from '../types/DBTypes';
import {useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {dummyMediaArray} from '../utils/dummyData';

const Home = () => {
  const mediaArray: MediaItem[] = dummyMediaArray;

  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
    undefined,
  );

  return (
    <section className="space-y-4">
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}

      <header className="flex items-baseline justify-between gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">My Media</h2>
        <p className="text-sm text-stone-200/70">
          Total items: {mediaArray.length}
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border border-stone-500/70 bg-stone-700/40 shadow">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead className="bg-stone-800/80">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Thumbnail
              </th>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Title
              </th>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Description
              </th>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Created
              </th>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Size
              </th>
              <th className="px-3 py-2 text-left font-semibold text-stone-100">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {mediaArray.map((item, index) => (
              <MediaRow
                key={item.media_id}
                item={item}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Home;