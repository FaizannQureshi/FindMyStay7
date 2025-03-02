import styled from 'styled-components/native';

export const ScrollViewStyled = styled.ScrollView`
  flex: 1;
  background-color: #f6ece5;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f6ece5;
  padding-top: 50px;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const OptionsButton = styled.TouchableOpacity``;

export const ImageStyled = styled.Image`
  width: 100%;
  height: 200px;
`;

export const Features = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  background-color: #f6ece5;
`;

export const FeatureItem = styled.View`
  align-items: center;
`;

export const FeatureText = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #333;
`;

export const Details = styled.View`
  padding: 16px;
  background-color: #f6ece5;
  margin-top: 8px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

export const Price = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #5d4940;
`;

export const Subtitle = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  flex-direction: row;
  align-items: center;
`;

export const DescriptionHeading = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const Description = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
`;

export const PreviewSection = styled.View`
  margin-top: 8px;
  padding: 16px;
  background-color: #f6ece5;
`;

export const SectionHeading = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const PreviewImages = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const PreviewImage = styled.Image`
  width: 100px;
  height: 80px;
  margin-right: 8px;
  border-radius: 8px;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background-color: #f6ece5;
  margin-top: 8px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  background-color: #5d4940;
  padding: 12px;
  align-items: center;
  border-radius: 8px;
  margin-right: 8px;
`;

export const ButtonSecondary = styled.TouchableOpacity`
  flex: 1;
  background-color: #5d4940;
  padding: 12px;
  align-items: center;
  border-radius: 8px;
  margin-left: 8px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const ButtonTextSecondary = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;