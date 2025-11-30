import { motion } from 'framer-motion';

const BadgeCard = ({ badge, earned = false, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
      className={`relative p-4 rounded-lg border-2 ${
        earned
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-400 dark:border-yellow-600'
          : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`text-4xl ${earned ? '' : 'grayscale opacity-50'}`}
        >
          {badge.icon || '🏆'}
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold ${
              earned
                ? 'text-yellow-800 dark:text-yellow-200'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {badge.name}
          </h3>
          <p
            className={`text-sm ${
              earned
                ? 'text-yellow-700 dark:text-yellow-300'
                : 'text-gray-500 dark:text-gray-500'
            }`}
          >
            {badge.description}
          </p>
        </div>
        {earned && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute top-2 right-2"
          >
            <span className="text-green-500 text-xl">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BadgeCard;
