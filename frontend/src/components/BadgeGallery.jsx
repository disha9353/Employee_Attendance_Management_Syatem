import { motion } from 'framer-motion';
import BadgeCard from './BadgeCard';
import Card from './Card';

const BadgeGallery = ({ badges, allBadges }) => {
  // Get all available badges
  const availableBadges = allBadges || {};
  const earnedBadgeIds = badges?.map((b) => b.id) || [];

  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Badge Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(availableBadges).map((badgeId, index) => {
          const badge = availableBadges[badgeId];
          const earned = earnedBadgeIds.includes(badgeId);
          return (
            <BadgeCard
              key={badgeId}
              badge={{ id: badgeId, ...badge }}
              earned={earned}
              index={index}
            />
          );
        })}
      </div>
      {Object.keys(availableBadges).length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No badges available
        </p>
      )}
    </Card>
  );
};

export default BadgeGallery;
