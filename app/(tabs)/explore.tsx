import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>Discover how you can grow with us.</ThemedText>
      
      <Collapsible title="Become an Associate">
        <ThemedText>
          If you want to become an associate, join us today and start your journey!
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/become-associate">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Register Your Shop">
        <ThemedText>
          Register your shop to become a partner and buy the most demanding items in bulk for your shop.
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/register-shop">
          <ThemedText type="link">Register Now</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Happy Customer Remarks">
        <ThemedText>
          See our happy customer remarks from both direct customers and business partners.
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/customer-reviews">
          <ThemedText type="link">View Reviews</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Exclusive Deals & Offers">
        <ThemedText>
          Get access to exclusive deals and offers available only to our registered partners.
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/deals">
          <ThemedText type="link">Explore Deals</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Customer Support 24/7">
        <ThemedText>
          Need assistance? Our customer support team is available 24/7 to help you with any queries.
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/support">
          <ThemedText type="link">Contact Support</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Join Our Community">
        <ThemedText>
          Be a part of our thriving community and stay updated with the latest trends and updates.
        </ThemedText>
        <ExternalLink href="https://yourwebsite.com/community">
          <ThemedText type="link">Join Now</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
