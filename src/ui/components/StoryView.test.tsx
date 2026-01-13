import { render, screen } from '@testing-library/react';
import StoryView from './StoryView';
import { Scene } from '../../domain/types';
import '@testing-library/jest-dom'; // Ensure matchers are available

const mockScene: Scene = {
  id: 'test-scene',
  titel: 'Test Title',
  kapitel: 'Chapter 1',
  beschreibung: 'Long text that should scroll...',
  atmosphere: 'normal',
  choices: []
};

describe('StoryView', () => {
  it('renders with the custom scrollbar class', () => {
    render(
      <StoryView
        scene={mockScene}
        stats={{ mut: 0, wissen: 0, empathie: 0 }}
        flags={{}}
        inventory={[]}
        onMakeChoice={() => {}}
        settings={{ textSpeed: 0, typingEnabled: false }}
      />
    );
    
    // The text is rendered inside paragraph tags in TypewriterText
    // We find the element containing the text
    const textElement = screen.getByText('Long text that should scroll...');
    
    // We need to traverse up to find the scrollable container
    // Structure: div.scrollbar-custom > TypewriterText (div) > p > text
    const scrollableContainer = textElement.closest('.scrollbar-custom');
    
    expect(scrollableContainer).toBeInTheDocument();
    expect(scrollableContainer).toHaveClass('overflow-y-auto');
  });
});
