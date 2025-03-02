import styled from 'styled-components/native';

export const safeArea = styled.View`
flex: 1;
`;


export const Container = styled.View`
  flex: 1;
  background-color: #f6ece5;
  padding-top: 65px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f6ece5;
`;

export const LocationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LocationText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-left: 8px;
`;

export const BellIcon = styled.View`
  padding: 8px;
  background-color: #e8e1dc;
  border-radius: 20px;
`;

export const Categories = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #f6ece5;
`;

export const Category = styled.TouchableOpacity`
  align-items: center;
  padding: 8px 16px;
  background-color: ${(props) => (props.selected ? '#5d4940' : '#e8e1dc')};
  border-radius: 20px;
`;

export const CategoryText = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: ${(props) => (props.selected ? '#fff' : '#666')};
`;

export const Section = styled.View`
  margin: 16px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const SectionHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const SeeAll = styled.Text`
  font-size: 14px;
  color: #5d4940;
`;

export const Card = styled.View`
  flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
  background-color:rgb(238, 226, 216);
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  width: ${(props) => (props.horizontal ? '100%' : '200px')};
`;

export const CardImage = styled.Image`
  width: ${(props) => (props.horizontal ? '200px' : '100%')};
  height: ${(props) => (props.horizontal ? '200px' : '200px')};
`;

export const CardContent = styled.View`
  flex: 1;
  padding: 8px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

export const CardSubtitle = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const CardPrice = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #5d4940;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 16px 0;
  background-color: #e8e1dc;
`;

export const NavItem = styled.TouchableOpacity`
  align-items: center;
`;

export const NavText = styled.Text`
  font-size: 12px;
  color: #666;
`;
