import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../src/theme';
import { Card, Badge, Button, Input } from '../../src/components';
import { campaigns as seededCampaigns } from '../../src/data/demo';
import type { Campaign } from '../../src/types';

const statusVariant: Record<Campaign['status'], 'success' | 'warning' | 'info' | 'error'> = {
  active: 'success',
  draft: 'info',
  paused: 'warning',
  expired: 'error',
};

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Card style={styles.campaignCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.campaignName} numberOfLines={1}>{campaign.name}</Text>
          <Badge label={campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)} variant={statusVariant[campaign.status]} size="sm" />
        </View>
        <Text style={styles.companyName}>{campaign.companyName}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>{campaign.description}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.mediumGray} />
          <Text style={styles.metaText}>{campaign.startDate} - {campaign.endDate}</Text>
        </View>
        {campaign.pointsRequired > 0 && (
          <View style={styles.metaItem}>
            <Ionicons name="star-outline" size={14} color={colors.mediumGray} />
            <Text style={styles.metaText}>{campaign.pointsRequired.toLocaleString()} pts required</Text>
          </View>
        )}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.metaItem}>
          <Ionicons name="people-outline" size={14} color={colors.mediumGray} />
          <Text style={styles.metaText}>{campaign.eligibility}</Text>
        </View>
        <Text style={styles.rewardType}>{campaign.rewardType}</Text>
      </View>
    </Card>
  );
}

export default function CampaignsScreen() {
  const [campaignList, setCampaignList] = useState<Campaign[]>(seededCampaigns);
  const [modalVisible, setModalVisible] = useState(false);
  const [campaignName, setCampaignName] = useState('Customer Appreciation Bonus');
  const [description, setDescription] = useState('Award bonus points to customers who link both Sunshine Finance and Sunshine Insurance accounts.');

  const activeCampaigns = campaignList.filter((c) => c.status === 'active');
  const otherCampaigns = campaignList.filter((c) => c.status !== 'active');

  const handleCreateCampaign = () => {
    const campaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: campaignName,
      companyId: 'comp1',
      companyName: 'Sunshine Rewards',
      rewardType: 'Bonus Points',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '2026-12-31',
      pointsRequired: 0,
      description,
      status: 'draft',
      eligibility: 'Linked multi-company customers',
    };
    setCampaignList((current) => [campaign, ...current]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Campaigns</Text>
          <Button title="Create Campaign" onPress={() => setModalVisible(true)} variant="primary" size="sm" />
        </View>

        {activeCampaigns.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Active ({activeCampaigns.length})</Text>
            {activeCampaigns.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
          </>
        )}

        {otherCampaigns.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>Draft / Expired ({otherCampaigns.length})</Text>
            {otherCampaigns.map((campaign) => <CampaignCard key={campaign.id} campaign={campaign} />)}
          </>
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <Card style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create Campaign</Text>
            <Text style={styles.modalSubtitle}>Demo campaign is added as a draft for presentation purposes.</Text>
            <Input label="Campaign name" value={campaignName} onChangeText={setCampaignName} leftIcon="megaphone-outline" />
            <Input label="Description" value={description} onChangeText={setDescription} leftIcon="document-text-outline" />
            <Button title="Save Draft Campaign" onPress={handleCreateCampaign} fullWidth />
            <View style={styles.modalGap} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} variant="outline" fullWidth />
          </Card>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.lightGray },
  container: { flex: 1 },
  contentContainer: { padding: spacing.md, paddingBottom: spacing.xxl },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  pageTitle: { ...typography.h2, color: colors.charcoal },
  sectionLabel: { ...typography.captionBold, color: colors.mediumGray, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.sm + 4, marginTop: spacing.sm },
  campaignCard: { padding: spacing.md, marginBottom: spacing.sm + 4 },
  cardHeader: { marginBottom: spacing.sm },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm, marginBottom: spacing.xs },
  campaignName: { ...typography.bodyBold, color: colors.charcoal, flex: 1 },
  companyName: { ...typography.caption, color: colors.mediumGray },
  description: { ...typography.caption, color: colors.darkGray, marginBottom: spacing.sm + 4, lineHeight: 20 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  metaText: { ...typography.small, color: colors.mediumGray },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.borderGray },
  rewardType: { ...typography.smallBold, color: colors.primary },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: spacing.lg },
  modalCard: { padding: spacing.lg },
  modalTitle: { ...typography.h2, color: colors.charcoal, marginBottom: spacing.xs },
  modalSubtitle: { ...typography.caption, color: colors.mediumGray, marginBottom: spacing.md },
  modalGap: { height: spacing.sm },
});
