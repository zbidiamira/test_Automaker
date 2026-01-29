import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SymptomChecker from '../../components/AI/SymptomChecker';

// Mock all services
vi.mock('../../services/aiService', () => ({
  diagnoseSymptoms: vi.fn(),
  durationOptions: [
    { value: 'less_than_day', label: 'Less than 24 hours' },
    { value: '1-3_days', label: '1-3 days' },
    { value: '4-7_days', label: '4-7 days' },
    { value: '1-2_weeks', label: '1-2 weeks' },
    { value: 'more_than_2_weeks', label: 'More than 2 weeks' },
  ],
}));

vi.mock('../../services/animalService', () => ({
  getAnimals: vi.fn().mockResolvedValue({
    data: [
      {
        _id: '1',
        name: 'Buddy',
        species: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
      },
      {
        _id: '2',
        name: 'Whiskers',
        species: 'Cat',
        breed: 'Persian',
        age: 5,
      },
    ],
  }),
}));

vi.mock('../../services/healthService', () => ({
  createHealthRecord: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderSymptomChecker = (props = {}) => {
  // Set disclaimer as accepted for tests
  localStorage.setItem('ai_disclaimer_accepted', 'true');
  
  return render(
    <BrowserRouter>
      <SymptomChecker {...props} />
    </BrowserRouter>
  );
};

describe('SymptomChecker Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('ai_disclaimer_accepted', 'true');
  });

  describe('Step 1: Animal Selection', () => {
    it('should render the symptom checker wizard', async () => {
      renderSymptomChecker();

      await waitFor(() => {
        expect(screen.getByText(/select.*animal|select.*pet|which animal/i)).toBeInTheDocument();
      });
    });

    it('should display available animals', async () => {
      renderSymptomChecker();

      await waitFor(() => {
        expect(screen.getByText('Buddy')).toBeInTheDocument();
        expect(screen.getByText('Whiskers')).toBeInTheDocument();
      });
    });

    it('should show progress indicator', async () => {
      renderSymptomChecker();

      await waitFor(() => {
        // Check for step indicator
        expect(screen.getByText(/step|1.*of.*4|1\/4/i)).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate to next step when animal is selected', async () => {
      renderSymptomChecker();
      const user = userEvent.setup();

      await waitFor(() => {
        expect(screen.getByText('Buddy')).toBeInTheDocument();
      });

      // Click on Buddy to select
      const buddyCard = screen.getByText('Buddy').closest('button') || 
                        screen.getByText('Buddy').closest('div[role="button"]') ||
                        screen.getByText('Buddy');
      await user.click(buddyCard);

      // Should move to symptom selection step
      await waitFor(() => {
        expect(screen.getByText(/symptom|select symptoms/i)).toBeInTheDocument();
      });
    });
  });

  describe('Pre-selected Animal', () => {
    it('should skip animal selection when preSelectedAnimal is provided', async () => {
      const preSelectedAnimal = {
        _id: '1',
        name: 'Buddy',
        species: 'Dog',
      };

      renderSymptomChecker({ preSelectedAnimal });

      // Should be on symptom selection step, not animal selection
      await waitFor(() => {
        expect(screen.getByText(/symptom|select symptoms/i)).toBeInTheDocument();
      });
    });
  });

  describe('Disclaimer Modal', () => {
    it('should show disclaimer on first visit', async () => {
      localStorage.removeItem('ai_disclaimer_accepted');
      
      render(
        <BrowserRouter>
          <SymptomChecker />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/disclaimer|understand|ai.*not.*substitute/i)).toBeInTheDocument();
      });
    });

    it('should not show disclaimer if already accepted', async () => {
      localStorage.setItem('ai_disclaimer_accepted', 'true');
      renderSymptomChecker();

      await waitFor(() => {
        expect(screen.queryByText(/i understand this is not a substitute/i)).not.toBeInTheDocument();
      });
    });
  });
});
