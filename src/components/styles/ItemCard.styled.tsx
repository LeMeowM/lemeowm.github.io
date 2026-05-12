import styled from "styled-components";

export const ItemList = styled.div`
  margin-bottom: 0.25rem;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemNum = styled.span`
  color: ${({ theme }) => theme.colors?.primary};
`;

export const ItemTitle = styled.span`
  color: ${({ theme }) => theme.colors?.text[200]};
  font-weight: 700;
`;

export const ItemTitleLink = styled.a`
  color: ${({ theme }) => theme.colors?.text[200]};
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px dashed ${({ theme }) => theme.colors?.text[300]};

  &:hover {
    border-bottom-style: solid;
  }
`;

export const ItemMeta = styled.span`
  color: ${({ theme }) => theme.colors?.text[300]};
  font-size: 0.875rem;
`;

export const ItemDesc = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  line-height: 1.5rem;
`;

export const ItemHint = styled.div`
  color: ${({ theme }) => theme.colors?.text[200]};
  opacity: 0.6;
  font-size: 0.875rem;
`;

export const ItemThumb = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  opacity: 0.7;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors?.text[300]};
`;
