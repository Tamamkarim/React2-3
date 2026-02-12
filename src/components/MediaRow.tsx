import type {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  return (
    <tr className="border-b border-stone-600 last:border-0 hover:bg-stone-700/40">
      <td className="px-3 py-2 align-top">
        <img
          className="h-16 w-28 rounded object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </td>
      <td className="px-3 py-2 align-top font-semibold text-stone-50">
        {item.title}
      </td>
      <td className="px-3 py-2 align-top max-w-xs text-stone-200">
        {item.description}
      </td>
      <td className="px-3 py-2 align-top text-stone-200">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="px-3 py-2 align-top text-stone-200">
        {(item.filesize / 1024 / 1024).toFixed(2)} MB
      </td>
      <td className="px-3 py-2 align-top text-stone-200">
        <div className="flex flex-col gap-1">
          <span>{item.media_type}</span>
          <button
            className="mt-1 bg-stone-500 p-1 text-center text-xs transition-all duration-500 ease-in-out hover:bg-stone-700"
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            View
          </button>
          {user && (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                className="bg-stone-500 p-1 text-center text-xs transition-all duration-500 ease-in-out hover:bg-stone-700"
                onClick={() => {
                  console.log('edit media item', item, 'current user', user);
                }}
              >
                Edit
              </button>
              <button
                className="bg-stone-500 p-1 text-center text-xs transition-all duration-500 ease-in-out hover:bg-stone-700"
                onClick={() => {
                  console.log('delete media item');
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;