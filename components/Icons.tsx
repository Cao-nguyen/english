import React from 'react';
import { 
  Scale, 
  Smile, 
  FileText, 
  BookOpen, 
  Hammer, 
  Frown, 
  Wrench, 
  Brain, 
  GraduationCap, 
  HelpCircle 
} from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, size = 24, className = "" }) => {
  const icons: Record<string, React.ElementType> = {
    Scale,
    Smile,
    FileText,
    BookOpen,
    Hammer,
    Frown,
    Wrench,
    Brain,
    GraduationCap,
    HelpCircle
  };

  const IconComponent = icons[name] || HelpCircle;

  return <IconComponent size={size} className={className} />;
};