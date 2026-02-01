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
    <>
      {/* Debug
       <p>Selected item: {selectedItem?.title}</p> */}
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;