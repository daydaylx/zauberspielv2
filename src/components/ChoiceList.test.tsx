import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChoiceList } from './ChoiceList';
import { Choice } from '../types';
import '@testing-library/jest-dom';

describe('ChoiceList Component', () => {
  const mockOnChoice = vi.fn();
  
  const sampleChoices: Choice[] = [
    {
      text: 'Normaler Weg',
      naechsteSzeneId: 'scene_1'
    },
    {
      text: 'Weg mit Belohnung',
      naechsteSzeneId: 'scene_2',
      itemBelohnung: 'Goldener Schlüssel'
    }
  ];

  it('renders all choices', () => {
    render(<ChoiceList choices={sampleChoices} onChoice={mockOnChoice} />);
    
    expect(screen.getByText('Normaler Weg')).toBeInTheDocument();
    expect(screen.getByText('Weg mit Belohnung')).toBeInTheDocument();
  });

  it('shows item reward icon and text when itemBelohnung is present', () => {
    render(<ChoiceList choices={sampleChoices} onChoice={mockOnChoice} />);
    
    // Sucht nach dem Text der Belohnung
    const rewardElement = screen.getByText('Goldener Schlüssel');
    expect(rewardElement).toBeInTheDocument();
    
    // Prüft, ob das Element das erwartete Styling für Belohnungen hat (grob über Klassen)
    // Da wir Tailwind Klassen haben, können wir prüfen ob das Parent die Farben hat
    expect(rewardElement.closest('div')).toHaveClass('text-amber-700');
  });

  it('calls onChoice when a button is clicked', () => {
    render(<ChoiceList choices={sampleChoices} onChoice={mockOnChoice} />);
    
    fireEvent.click(screen.getByText('Normaler Weg'));
    
    expect(mockOnChoice).toHaveBeenCalledTimes(1);
    expect(mockOnChoice).toHaveBeenCalledWith(sampleChoices[0]);
  });

  it('disables buttons when disabled prop is true', () => {
    render(<ChoiceList choices={sampleChoices} onChoice={mockOnChoice} disabled={true} />);
    
    const button = screen.getByText('Normaler Weg').closest('button');
    expect(button).toBeDisabled();
  });
});
