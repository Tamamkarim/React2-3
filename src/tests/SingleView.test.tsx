import { render, screen, fireEvent } from '@testing-library/react';
import SingleView from '../components/SingleView';
import '@testing-library/jest-dom';

const imageItem = {
  media_id: 1,
  user_id: 2,
  filename: 'https://placehold.co/600x400',
  thumbnail: 'https://placehold.co/100x100',
  filesize: 12345,
  media_type: 'image/jpeg',
  title: 'Test Image',
  description: 'A test image',
  created_at: '2024-01-01T12:00:00.000Z',
  screenshots: [],
};

const videoItem = {
  ...imageItem,
  media_type: 'video/mp4',
  filename: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
  title: 'Test Video',
};

describe('SingleView component', () => {
  test('renders image item correctly', () => {
    render(<SingleView item={imageItem} setSelectedItem={() => {}} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', imageItem.filename);
    expect(screen.getByText(imageItem.title)).toBeInTheDocument();
    expect(screen.getByText(imageItem.description)).toBeInTheDocument();
  });

  test('renders video item correctly', () => {
    render(<SingleView item={videoItem} setSelectedItem={() => {}} />);
    // video element does not have role 'video', so we check by tag
    expect(document.querySelector('video')).toBeInTheDocument();
    expect(screen.getByText(videoItem.title)).toBeInTheDocument();
  });

  test('calls setSelectedItem(undefined) when Close is clicked', () => {
    const mockSetSelectedItem = vi.fn();
    render(<SingleView item={imageItem} setSelectedItem={mockSetSelectedItem} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockSetSelectedItem).toHaveBeenCalledWith(undefined);
  });
});
