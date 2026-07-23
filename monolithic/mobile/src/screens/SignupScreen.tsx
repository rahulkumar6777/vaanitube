import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CheckCircle2,
  FileImage,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react-native';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../lib/api';
import type { AppScreen, SignupRole, VerificationType } from '../types';

type SignupScreenProps = {
  onNavigate: (screen: AppScreen) => void;
};

type SignupStep = 'details' | 'verify';

type SignupForm = {
  fullName: string;
  email: string;
  phoneno: string;
  age: string;
  password: string;
  verificationType: VerificationType;
  verificationValue: string;
  address: string;
};

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  maxLength?: number;
  multiline?: boolean;
};

const initialForm: SignupForm = {
  fullName: '',
  email: '',
  phoneno: '',
  age: '',
  password: '',
  verificationType: 'pan',
  verificationValue: '',
  address: '',
};

function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  maxLength,
  multiline = false,
}: TextFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#737373"
        secureTextEntry={secureTextEntry}
        style={[styles.input, multiline && styles.textArea]}
        textAlignVertical={multiline ? 'top' : 'center'}
        value={value}
      />
    </View>
  );
}

const getUploadFileName = (photo: Asset, index: number) => {
  return photo.fileName || `verification-${index + 1}.jpg`;
};

export function SignupScreen({ onNavigate }: SignupScreenProps) {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState<SignupRole>('viewer');
  const [step, setStep] = useState<SignupStep>('details');
  const [form, setForm] = useState(initialForm);
  const [otp, setOtp] = useState('');
  const [photos, setPhotos] = useState<Asset[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verificationPlaceholder = useMemo(
    () => (form.verificationType === 'pan' ? 'ABCDE1234F' : '123412341234'),
    [form.verificationType],
  );

  useEffect(() => {
    if (isAuthenticated) {
      onNavigate('home');
    }
  }, [isAuthenticated, onNavigate]);

  const updateField = (name: keyof SignupForm, value: string) => {
    setForm(currentForm => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const selectPhotos = async () => {
    setError('');

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 2,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        setError(result.errorMessage || 'Could not select photos');
        return;
      }

      const selectedPhotos = (result.assets || [])
        .filter(photo => Boolean(photo.uri))
        .slice(0, 2);

      setPhotos(selectedPhotos);
    } catch (selectError) {
      const messageText =
        selectError instanceof Error
          ? selectError.message
          : 'Could not select photos';
      setError(messageText);
    }
  };

  const submitDetails = async () => {
    const age = Number(form.age);

    setError('');
    setMessage('');

    if (!Number.isFinite(age)) {
      setError('Age is required');
      return;
    }

    if (role === 'creator' && photos.length === 0) {
      setError('Upload 1 or 2 verification photos');
      return;
    }

    setIsSubmitting(true);

    try {
      if (role === 'creator') {
        const creatorPayload = new FormData();
        creatorPayload.append('fullName', form.fullName.trim());
        creatorPayload.append('email', form.email.trim());
        creatorPayload.append('phoneno', form.phoneno.trim());
        creatorPayload.append('age', String(age));
        creatorPayload.append('password', form.password);
        creatorPayload.append('verificationType', form.verificationType);
        creatorPayload.append(
          'verificationValue',
          form.verificationType === 'pan'
            ? form.verificationValue.trim().toUpperCase()
            : form.verificationValue.trim(),
        );
        creatorPayload.append('address', form.address.trim());

        photos.slice(0, 2).forEach((photo, index) => {
          if (!photo.uri) {
            return;
          }

          const uploadFile = {
            uri: photo.uri,
            name: getUploadFileName(photo, index),
            type: photo.type || 'image/jpeg',
          };

          creatorPayload.append(
            'verificationPhotos',
            uploadFile as unknown as Blob,
          );
        });

        await authApi.initCreatorSignup(creatorPayload);
      } else {
        await authApi.initViewerSignup({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phoneno: form.phoneno.trim(),
          age,
          password: form.password,
        });
      }

      setStep('verify');
      setMessage('OTP sent successfully.');
    } catch (submitError) {
      const messageText =
        submitError instanceof Error ? submitError.message : 'Signup failed';
      setError(messageText);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOtp = async () => {
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      const payload = await authApi.verifySignup({
        email: form.email.trim(),
        otp,
      });
      setMessage(payload?.message || 'Registration verified successfully.');
      setTimeout(() => onNavigate('login'), 900);
    } catch (submitError) {
      const messageText =
        submitError instanceof Error
          ? submitError.message
          : 'Verification failed';
      setError(messageText);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <View style={styles.topRow}>
            <View style={styles.headingBlock}>
              <View style={styles.iconWrap}>
                {step === 'verify' ? (
                  <KeyRound size={22} color="#dc2626" />
                ) : (
                  <UserRound size={22} color="#dc2626" />
                )}
              </View>
              <Text style={styles.title}>
                {step === 'verify' ? 'Verify OTP' : 'Create account'}
              </Text>
              <Text style={styles.subtitle}>
                {step === 'verify'
                  ? 'Enter the 6 digit code sent to your email.'
                  : 'Choose viewer or creator and complete signup.'}
              </Text>
            </View>

            {step === 'details' && (
              <View style={styles.roleSwitch}>
                {(['viewer', 'creator'] as SignupRole[]).map(option => {
                  const isActive = role === option;

                  return (
                    <Pressable
                      accessibilityRole="button"
                      key={option}
                      onPress={() => setRole(option)}
                      style={({ pressed }) => [
                        styles.roleOption,
                        isActive && styles.roleOptionActive,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.roleOptionText,
                          isActive && styles.roleOptionTextActive,
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          {!!message && (
            <View style={styles.successBox}>
              <CheckCircle2 size={18} color="#047857" />
              <Text style={styles.successText}>{message}</Text>
            </View>
          )}

          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {step === 'details' ? (
            <View>
              <TextField
                label="Full name"
                onChangeText={value => updateField('fullName', value)}
                placeholder="Rahul Sharma"
                value={form.fullName}
              />
              <TextField
                autoCapitalize="none"
                keyboardType="email-address"
                label="Email"
                onChangeText={value => updateField('email', value)}
                placeholder="you@example.com"
                value={form.email}
              />
              <TextField
                keyboardType="phone-pad"
                label="Phone number"
                onChangeText={value => updateField('phoneno', value)}
                placeholder="+919999999999"
                value={form.phoneno}
              />
              <TextField
                keyboardType="number-pad"
                label="Age"
                onChangeText={value =>
                  updateField('age', value.replace(/\D/g, ''))
                }
                placeholder={role === 'creator' ? '18' : '16'}
                value={form.age}
              />
              <TextField
                autoCapitalize="none"
                label="Password"
                onChangeText={value => updateField('password', value)}
                placeholder="Strong password"
                secureTextEntry
                value={form.password}
              />

              {role === 'creator' && (
                <View>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Verification type</Text>
                    <View style={styles.verificationSwitch}>
                      {(['pan', 'aadhaar'] as VerificationType[]).map(
                        option => {
                          const isActive = form.verificationType === option;

                          return (
                            <Pressable
                              accessibilityRole="button"
                              key={option}
                              onPress={() =>
                                updateField('verificationType', option)
                              }
                              style={({ pressed }) => [
                                styles.verificationOption,
                                isActive && styles.verificationOptionActive,
                                pressed && styles.pressed,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.verificationOptionText,
                                  isActive &&
                                    styles.verificationOptionTextActive,
                                ]}
                              >
                                {option === 'pan' ? 'PAN' : 'Aadhaar'}
                              </Text>
                            </Pressable>
                          );
                        },
                      )}
                    </View>
                  </View>

                  <TextField
                    autoCapitalize={
                      form.verificationType === 'pan' ? 'characters' : 'none'
                    }
                    keyboardType={
                      form.verificationType === 'pan' ? 'default' : 'number-pad'
                    }
                    label="Verification value"
                    maxLength={form.verificationType === 'pan' ? 10 : 12}
                    onChangeText={value =>
                      updateField('verificationValue', value)
                    }
                    placeholder={verificationPlaceholder}
                    value={form.verificationValue}
                  />

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Verification photos</Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={selectPhotos}
                      style={({ pressed }) => [
                        styles.photoPicker,
                        pressed && styles.pressed,
                      ]}
                    >
                      <FileImage size={18} color="#525252" />
                      <Text style={styles.photoPickerText}>
                        {photos.length ? 'Change photos' : 'Add photos'}
                      </Text>
                      <Text style={styles.photoCount}>{photos.length}/2</Text>
                    </Pressable>
                    {photos.length > 0 && (
                      <View style={styles.photoPreviewRow}>
                        {photos.map((photo, index) => (
                          <View
                            key={`${photo.uri}-${index}`}
                            style={styles.photoPreview}
                          >
                            <Image
                              source={{ uri: photo.uri }}
                              resizeMode="cover"
                              style={styles.photoImage}
                            />
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  <TextField
                    label="Address"
                    multiline
                    onChangeText={value => updateField('address', value)}
                    placeholder="Complete address"
                    value={form.address}
                  />
                </View>
              )}

              <Pressable
                accessibilityRole="button"
                disabled={isSubmitting}
                onPress={submitDetails}
                style={({ pressed }) => [
                  styles.submitButton,
                  isSubmitting && styles.disabledButton,
                  pressed && !isSubmitting && styles.darkPressed,
                ]}
              >
                <Text style={styles.submitText}>
                  {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.readOnlyRow}>
                  <Mail size={18} color="#737373" />
                  <Text numberOfLines={1} style={styles.readOnlyText}>
                    {form.email}
                  </Text>
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>OTP</Text>
                <TextInput
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={value =>
                    setOtp(value.replace(/\D/g, '').slice(0, 6))
                  }
                  placeholder="000000"
                  placeholderTextColor="#737373"
                  style={styles.otpInput}
                  value={otp}
                />
              </View>

              <Pressable
                accessibilityRole="button"
                disabled={isSubmitting || otp.length !== 6}
                onPress={submitOtp}
                style={({ pressed }) => [
                  styles.submitButton,
                  (isSubmitting || otp.length !== 6) && styles.disabledButton,
                  pressed &&
                    !isSubmitting &&
                    otp.length === 6 &&
                    styles.darkPressed,
                ]}
              >
                <Text style={styles.submitText}>
                  {isSubmitting ? 'Verifying...' : 'Verify account'}
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={() => setStep('details')}
                style={({ pressed }) => [
                  styles.editButton,
                  pressed && styles.pressed,
                ]}
              >
                <ShieldCheck size={16} color="#404040" />
                <Text style={styles.editButtonText}>Edit signup details</Text>
              </Pressable>
            </View>
          )}

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => onNavigate('login')}
            >
              <Text style={styles.footerLink}>Login</Text>
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
  topRow: {
    gap: 18,
  },
  headingBlock: {
    minWidth: 0,
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
  roleSwitch: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  roleOption: {
    height: 36,
    minWidth: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  roleOptionActive: {
    backgroundColor: '#171717',
  },
  roleOptionText: {
    color: '#404040',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  roleOptionTextActive: {
    color: '#ffffff',
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  successText: {
    flex: 1,
    color: '#047857',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
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
  input: {
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
    color: '#171717',
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  textArea: {
    minHeight: 98,
    lineHeight: 21,
  },
  verificationSwitch: {
    flexDirection: 'row',
    gap: 8,
  },
  verificationOption: {
    height: 42,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
  },
  verificationOptionActive: {
    borderColor: '#171717',
    backgroundColor: '#171717',
  },
  verificationOptionText: {
    color: '#404040',
    fontSize: 13,
    fontWeight: '800',
  },
  verificationOptionTextActive: {
    color: '#ffffff',
  },
  photoPicker: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
  },
  photoPickerText: {
    flex: 1,
    color: '#404040',
    fontSize: 14,
    fontWeight: '700',
  },
  photoCount: {
    color: '#737373',
    fontSize: 13,
    fontWeight: '800',
  },
  photoPreviewRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  photoPreview: {
    width: 78,
    height: 78,
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
  },
  photoImage: {
    width: '100%',
    height: '100%',
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
  readOnlyRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#fafafa',
    paddingHorizontal: 12,
  },
  readOnlyText: {
    flex: 1,
    color: '#171717',
    fontSize: 15,
  },
  otpInput: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#ffffff',
    color: '#171717',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 4,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  editButton: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 12,
  },
  editButtonText: {
    color: '#404040',
    fontSize: 13,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  pressed: {
    opacity: 0.72,
  },
  darkPressed: {
    opacity: 0.86,
  },
});
