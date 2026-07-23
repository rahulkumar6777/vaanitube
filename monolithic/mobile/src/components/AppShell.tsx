import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  CircleUserRound,
  Clock3,
  Compass,
  Home,
  LogIn,
  LogOut,
  Menu,
  PlaySquare,
  Search,
  Upload,
  UserPlus,
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { DashboardScreen } from '../screens/DashboardScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import type { AppScreen } from '../types';

const navItems = [
  { label: 'Home', Icon: Home },
  { label: 'Explore', Icon: Compass },
  { label: 'Subs', Icon: PlaySquare },
  { label: 'History', Icon: Clock3 },
];

type AppShellProps = {
  screen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
};

export function AppShell({ screen, onNavigate }: AppShellProps) {
  const { isAuthenticated, isChecking, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('login');
  };

  const renderScreen = () => {
    if (screen === 'login') {
      return <LoginScreen onNavigate={onNavigate} />;
    }

    if (screen === 'signup') {
      return <SignupScreen onNavigate={onNavigate} />;
    }

    return <DashboardScreen onNavigate={onNavigate} />;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Menu"
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <Menu size={21} color="#171717" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => onNavigate('home')}
          style={styles.brand}
        >
          <View style={styles.logoBox}>
            <PlaySquare size={19} color="#ffffff" fill="#ffffff" />
          </View>
          <Text style={styles.brandText}>VaaniTube</Text>
        </Pressable>

        <View style={styles.headerActions}>
          {isChecking && !isAuthenticated ? (
            <>
              <View style={styles.skeletonPill} />
              <View style={styles.skeletonCircle} />
            </>
          ) : isAuthenticated ? (
            <>
              <Pressable
                accessibilityLabel="Upload"
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressed,
                ]}
              >
                <Upload size={20} color="#171717" />
              </Pressable>
              <Pressable
                accessibilityLabel="Notifications"
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressed,
                ]}
              >
                <Bell size={20} color="#171717" />
              </Pressable>
              <View style={styles.rolePill}>
                <CircleUserRound size={17} color="#ffffff" />
                <Text style={styles.roleText}>{user?.role || 'viewer'}</Text>
              </View>
              <Pressable
                accessibilityLabel="Logout"
                accessibilityRole="button"
                onPress={handleLogout}
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.pressed,
                ]}
              >
                <LogOut size={20} color="#171717" />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={() => onNavigate('login')}
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.pressed,
                ]}
              >
                <LogIn size={16} color="#262626" />
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => onNavigate('signup')}
                style={({ pressed }) => [
                  styles.signupButton,
                  pressed && styles.darkPressed,
                ]}
              >
                <UserPlus size={16} color="#ffffff" />
                <Text style={styles.signupText}>Signup</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>

      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <TextInput
            autoCapitalize="none"
            placeholder="Search"
            placeholderTextColor="#737373"
            returnKeyType="search"
            style={styles.searchInput}
          />
          <Pressable
            accessibilityLabel="Search"
            accessibilityRole="button"
            style={styles.searchButton}
          >
            <Search size={19} color="#404040" />
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.bottomNav}>
        {navItems.map(item => {
          const Icon = item.Icon;
          const isActive = screen === 'home' && item.label === 'Home';

          return (
            <Pressable
              accessibilityRole="button"
              key={item.label}
              onPress={() => onNavigate('home')}
              style={({ pressed }) => [
                styles.navItem,
                isActive && styles.navItemActive,
                pressed && styles.pressed,
              ]}
            >
              <Icon size={21} color={isActive ? '#171717' : '#525252'} />
              <Text
                style={[styles.navLabel, isActive && styles.navLabelActive]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  logoBox: {
    width: 36,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#dc2626',
  },
  brandText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '700',
  },
  headerActions: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  loginText: {
    color: '#262626',
    fontSize: 13,
    fontWeight: '700',
  },
  signupButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 19,
    paddingHorizontal: 12,
    backgroundColor: '#171717',
  },
  signupText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  rolePill: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 18,
    paddingLeft: 9,
    paddingRight: 12,
    backgroundColor: '#171717',
  },
  roleText: {
    maxWidth: 72,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  skeletonPill: {
    width: 72,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e5e5e5',
  },
  skeletonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#e5e5e5',
  },
  searchWrap: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#ffffff',
  },
  searchBox: {
    height: 42,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 16,
    color: '#171717',
    fontSize: 15,
  },
  searchButton: {
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#d4d4d4',
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    minHeight: 0,
  },
  bottomNav: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingTop: 5,
  },
  navItem: {
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: '#f5f5f5',
  },
  navLabel: {
    color: '#525252',
    fontSize: 11,
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#171717',
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.72,
  },
  darkPressed: {
    opacity: 0.86,
  },
});
