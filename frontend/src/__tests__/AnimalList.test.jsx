import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AnimalList from '../../components/Animals/AnimalList';

// Sample animals data for testing
const mockAnimals = [
  {
    _id: '1',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    gender: 'Male',
  },
  {
    _id: '2',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Persian',
    age: 5,
    weight: 4,
    gender: 'Female',
  },
  {
    _id: '3',
    name: 'Tweety',
    species: 'Bird',
    breed: 'Canary',
    age: 1,
    weight: 0.03,
    gender: 'Male',
  },
];

const renderAnimalList = (props = {}) => {
  const defaultProps = {
    animals: mockAnimals,
    loading: false,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onAdd: vi.fn(),
    ...props,
  };

  return render(
    <BrowserRouter>
      <AnimalList {...defaultProps} />
    </BrowserRouter>
  );
};

describe('AnimalList Component', () => {
  describe('Rendering', () => {
    it('should render search bar', () => {
      renderAnimalList();

      expect(screen.getByPlaceholderText('Search animals...')).toBeInTheDocument();
    });

    it('should render Add Animal button', () => {
      renderAnimalList();

      expect(screen.getByRole('button', { name: /add animal/i })).toBeInTheDocument();
    });

    it('should render view toggle buttons', () => {
      renderAnimalList();

      // Grid and list view toggle buttons exist
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(1);
    });

    it('should display all animals', () => {
      renderAnimalList();

      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.getByText('Whiskers')).toBeInTheDocument();
      expect(screen.getByText('Tweety')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should show empty state when no animals', () => {
      renderAnimalList({ animals: [] });

      expect(screen.getByText('No animals yet')).toBeInTheDocument();
      expect(screen.getByText(/add your first pet/i)).toBeInTheDocument();
    });

    it('should show "Add Your First Animal" button in empty state', () => {
      renderAnimalList({ animals: [] });

      expect(screen.getByRole('button', { name: /add your first animal/i })).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading skeletons when loading', () => {
      renderAnimalList({ loading: true, animals: [] });

      // Should not show empty state while loading
      expect(screen.queryByText('No animals yet')).not.toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should filter animals by name', async () => {
      renderAnimalList();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText('Search animals...');
      await user.type(searchInput, 'Buddy');

      expect(screen.getByText('Buddy')).toBeInTheDocument();
      expect(screen.queryByText('Whiskers')).not.toBeInTheDocument();
      expect(screen.queryByText('Tweety')).not.toBeInTheDocument();
    });

    it('should filter animals by species', async () => {
      renderAnimalList();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText('Search animals...');
      await user.type(searchInput, 'Cat');

      expect(screen.getByText('Whiskers')).toBeInTheDocument();
      expect(screen.queryByText('Buddy')).not.toBeInTheDocument();
    });

    it('should filter animals by breed', async () => {
      renderAnimalList();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText('Search animals...');
      await user.type(searchInput, 'Persian');

      expect(screen.getByText('Whiskers')).toBeInTheDocument();
      expect(screen.queryByText('Buddy')).not.toBeInTheDocument();
    });

    it('should show "No animals found" when search has no results', async () => {
      renderAnimalList();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText('Search animals...');
      await user.type(searchInput, 'NonexistentAnimal');

      expect(screen.getByText('No animals found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search terms')).toBeInTheDocument();
    });

    it('should be case insensitive search', async () => {
      renderAnimalList();
      const user = userEvent.setup();

      const searchInput = screen.getByPlaceholderText('Search animals...');
      await user.type(searchInput, 'BUDDY');

      expect(screen.getByText('Buddy')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should call onAdd when Add Animal button is clicked', async () => {
      const onAdd = vi.fn();
      renderAnimalList({ onAdd });
      const user = userEvent.setup();

      const addButton = screen.getByRole('button', { name: /add animal/i });
      await user.click(addButton);

      expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it('should call onAdd from empty state button', async () => {
      const onAdd = vi.fn();
      renderAnimalList({ animals: [], onAdd });
      const user = userEvent.setup();

      const addButton = screen.getByRole('button', { name: /add your first animal/i });
      await user.click(addButton);

      expect(onAdd).toHaveBeenCalledTimes(1);
    });
  });

  describe('View Mode Toggle', () => {
    it('should start in grid view by default', () => {
      renderAnimalList();

      // The component should render in grid view
      // The first toggle button (grid) should be active
      const gridButton = screen.getAllByRole('button')[0];
      expect(gridButton).toHaveClass('bg-white');
    });
  });
});
