import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import type { AppScreen } from '../types';

type LoginScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const { authError, isAuthenticated, login, status } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      onNavigate('home');
    }
  }, [isAuthenticated, onNavigate]);

  const updateField = (name: 'email' | 'password', value: string) => {
    setForm(currentForm => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      await login({ email: form.email.trim(), password: form.password });
      onNavigate('home');
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : 'Login failed';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = isSubmitting || status === 'checking';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardWrap}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <LockKeyhole size={22} color="#dc2626" />
          </View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Continue to your VaaniTube feed.</Text>

          {!!(error || authError) && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error || authError}</Text>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputRow}>
              <Mail size={18} color="#737373" />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={value => updateField('email', value)}
                placeholder="you@example.com"
                placeholderTextColor="#737373"
                style={styles.input}
                value={form.email}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputRow}>
              <LockKeyhole size={18} color="#737373" />
              <TextInput
                autoCapitalize="none"
                onChangeText={value => updateField('password', value)}
                placeholder="Your password"
                placeholderTextColor="#737373"
                secureTextEntry={!showPassword}
                style={styles.input}
                value={form.password}
              />
              <Pressable
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
                accessibilityRole="button"
                onPress={() => setShowPassword(currentValue => !currentValue)}
                style={styles.trailingButton}
              >
                {showPassword ? (
                  <EyeOff size={18} color="#525252" />
                ) : (
                  <Eye size={18} color="#525252" />
                )}
              </Pressable>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isDisabled}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              isDisabled && styles.disabledButton,
              pressed && !isDisabled && styles.darkPressed,
            ]}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New here?</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => onNavigate('signup')}
            >
              <Text style={styles.footerLink}>Create account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardWrap: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#ffffff',
    padding: 22,
  },
  iconWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#fef2f2',
  },
  title: {
    marginTop: 16,
    color: '#171717',
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: '#525252',
    fontSize: 14,
    lineHeight: 21,
  },
  errorBox: {
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  fieldGroup: {
    marginTop: 17,
  },
  label: {
    marginBottom: 7,
    color: '#262626',
    fontSize: 13,
    fontWeight: '800',
  },
  inputRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: '#171717',
    fontSize: 15,
    paddingVertical: 9,
  },
  trailingButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  submitButton: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    borderRadius: 23,
    backgroundColor: '#171717',
  },
  disabledButton: {
    backgroundColor: '#a3a3a3',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 22,
  },
  footerText: {
    color: '#525252',
    fontSize: 14,
  },
  footerLink: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
  darkPressed: {
    opacity: 0.86,
  },
});
