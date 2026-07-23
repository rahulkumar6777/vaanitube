import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LockKeyhole, Play, Sparkles, UserPlus } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { filters, videos, type Video } from '../data/videos';
import type { AppScreen } from '../types';

type DashboardScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

function LoadingFeed() {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.skeletonFilters}>
        {filters.slice(0, 5).map(filter => (
          <View key={filter} style={styles.skeletonFilter} />
        ))}
      </View>

      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonThumb} />
          <View style={styles.videoMeta}>
            <View style={styles.skeletonAvatar} />
            <View style={styles.skeletonLines}>
              <View style={styles.skeletonLineWide} />
              <View style={styles.skeletonLineShort} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function AuthGate({ onNavigate }: DashboardScreenProps) {
  return (
    <View style={styles.gate}>
      <View style={styles.gateIcon}>
        <LockKeyhole size={25} color="#dc2626" />
      </View>
      <Text style={styles.gateTitle}>Sign in to watch VaaniTube</Text>
      <Text style={styles.gateCopy}>
        Your feed, watch history, and creator tools open after authentication.
      </Text>
      <View style={styles.gateActions}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onNavigate('login')}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.darkPressed,
          ]}
        >
          <Sparkles size={17} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => onNavigate('signup')}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
        >
          <UserPlus size={17} color="#171717" />
          <Text style={styles.secondaryButtonText}>Create account</Text>
        </Pressable>
      </View>
    </View>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <View style={styles.card}>
      <Pressable accessibilityRole="button" style={styles.thumbnailButton}>
        <Image
          source={{ uri: video.thumbnail }}
          resizeMode="cover"
          style={styles.thumbnailImage}
        />
        <View style={styles.thumbnailOverlay} />
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
        <View style={styles.playButton}>
          <Play size={18} color="#171717" fill="#171717" />
        </View>
      </Pressable>

      <View style={styles.videoMeta}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{video.channel.charAt(0)}</Text>
        </View>
        <View style={styles.videoTextBlock}>
          <Text numberOfLines={2} style={styles.videoTitle}>
            {video.title}
          </Text>
          <Text numberOfLines={1} style={styles.videoChannel}>
            {video.channel}
          </Text>
          <Text numberOfLines={1} style={styles.videoStats}>
            {video.views} / {video.age}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const { isAuthenticated, isChecking } = useAuth();
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  if (isChecking && !isAuthenticated) {
    return <LoadingFeed />;
  }

  if (!isAuthenticated) {
    return <AuthGate onNavigate={onNavigate} />;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map(filter => {
          const isActive = filter === activeFilter;

          return (
            <Pressable
              accessibilityRole="button"
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={({ pressed }) => [
                styles.filterChip,
                isActive && styles.filterChipActive,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {videos.map(video => (
        <VideoCard key={video.title} video={video} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 18,
  },
  filterScroll: {
    marginHorizontal: -14,
    marginBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
  },
  filterContent: {
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  filterChip: {
    height: 36,
    justifyContent: 'center',
    borderRadius: 18,
    paddingHorizontal: 15,
    backgroundColor: '#e5e5e5',
  },
  filterChipActive: {
    backgroundColor: '#171717',
  },
  filterText: {
    color: '#262626',
    fontSize: 13,
    fontWeight: '700',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  card: {
    marginBottom: 26,
  },
  thumbnailButton: {
    position: 'relative',
    aspectRatio: 16 / 9,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.14)',
  },
  durationBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: 'rgba(0,0,0,0.86)',
  },
  durationText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  playButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  videoMeta: {
    flexDirection: 'row',
    gap: 11,
    marginTop: 11,
  },
  avatar: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#dc2626',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  videoTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  videoTitle: {
    color: '#171717',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  videoChannel: {
    marginTop: 4,
    color: '#525252',
    fontSize: 13,
    fontWeight: '500',
  },
  videoStats: {
    marginTop: 2,
    color: '#525252',
    fontSize: 13,
  },
  gate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  gateIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: '#fef2f2',
  },
  gateTitle: {
    marginTop: 18,
    color: '#171717',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
    lineHeight: 31,
  },
  gateCopy: {
    marginTop: 10,
    maxWidth: 310,
    color: '#525252',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  gateActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 24,
  },
  primaryButton: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 22,
    paddingHorizontal: 18,
    backgroundColor: '#171717',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    paddingHorizontal: 18,
    backgroundColor: '#ffffff',
  },
  secondaryButtonText: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '800',
  },
  skeletonFilters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  skeletonFilter: {
    width: 92,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e5e5',
  },
  skeletonCard: {
    marginBottom: 26,
  },
  skeletonThumb: {
    aspectRatio: 16 / 9,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  skeletonAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e5e5e5',
  },
  skeletonLines: {
    flex: 1,
    gap: 8,
    paddingTop: 4,
  },
  skeletonLineWide: {
    width: '82%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
  },
  skeletonLineShort: {
    width: '48%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
  },
  pressed: {
    opacity: 0.72,
  },
  darkPressed: {
    opacity: 0.86,
  },
});
