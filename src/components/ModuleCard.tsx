import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ModuleCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  badge?: string;
  isDisabled?: boolean;
}

export const ModuleCard = ({ name, description, icon: Icon, path, badge, isDisabled }: ModuleCardProps) => {
  const cardContent = (
    <div className={`relative bg-card rounded-xl p-6 card-shadow transition-all duration-300 h-full flex flex-col ${!isDisabled && 'hover:card-shadow-hover hover:-translate-y-1 cursor-pointer'} ${isDisabled && 'opacity-50'}`}>
      {badge && (
        <Badge className={`absolute top-4 right-4 ${badge === 'PRIME' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {badge}
        </Badge>
      )}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 flex items-center justify-center">
          <Icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-card-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </div>
  );

  if (isDisabled) {
    return cardContent;
  }

  return <Link to={path}>{cardContent}</Link>;
};
