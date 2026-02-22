import { type SecurityPolicy } from '../../backend';
import PolicyCard from './PolicyCard';

interface PolicyListProps {
  policies: SecurityPolicy[];
}

export default function PolicyList({ policies }: PolicyListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {policies.map((policy) => (
        <PolicyCard key={Number(policy.id)} policy={policy} />
      ))}
    </div>
  );
}
