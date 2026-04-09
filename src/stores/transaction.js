import { reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transaction', () => {
  // [5-1] API 기본 경로
  const BaseUri = '/api/transactions';

  // [5-1] 공용 거래 데이터 상태 정의
  const State = reactive({
    Transactions: [],
    SelectedPeriod: 'all',
    SelectedCategory: 'all',
    IsLoading: false,
    IsError: false,
    ErrorMessage: '',
  });

  // [2-1] 거래 목록 조회
  const FetchTransactions = async () => {
    State.IsLoading = true;
    try {
      // TODO: [2-1] Step 1 - const Response = await axios.get(BaseUri)
      // TODO: [2-1] Step 2 - State.Transactions = Response.data
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [1-4] 수입/지출 데이터 저장 API 호출 (단건)
  const CreateTransaction = async (TransactionData) => {
    State.IsLoading = true;
    try {
      const Response = await axios.post(BaseUri, TransactionData);
      State.Transactions.push(Response.data);
      State.IsError = false;
      State.ErrorMessage = '';
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [4-1] 기존 거래 데이터 불러오기 (단건)
  const FetchTransactionById = async (Id) => {
    State.IsLoading = true;
    try {
      // TODO: [4-1] Step 1 - const Response = await axios.get(`${BaseUri}/${Id}`)
      // TODO: [4-1] Step 2 - return Response.data
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [4-2] 기존 거래 수정 API 호출
  const UpdateTransaction = async (Id, TransactionData) => {
    State.IsLoading = true;
    try {
      // TODO: [4-2] Step 1 - const Response = await axios.put(`${BaseUri}/${Id}`, TransactionData)
      // TODO: [4-2] Step 2 - State.Transactions 에서 해당 id 항목을 Response.data로 교체
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [2-5] 거래 삭제 API 호출
  const DeleteTransaction = async (Id) => {
    State.IsLoading = true;
    try {
      // TODO: [2-5] Step 1 - await axios.delete(`${BaseUri}/${Id}`)
      // TODO: [2-5] Step 2 - State.Transactions = State.Transactions.filter(t => t.id !== Id)
    } catch (Error) {
      State.IsError = true;
      State.ErrorMessage = Error.message;
      console.error(Error);
    } finally {
      State.IsLoading = false;
    }
  };

  // [2-3] 기간 필터 상태 변경
  const SetSelectedPeriod = (Period) => {
    State.SelectedPeriod = Period;
  };

  // [2-3] 카테고리 필터 상태 변경
  const SetSelectedCategory = (Category) => {
    State.SelectedCategory = Category;
  };

  // [2-4] 기간 조건에 맞는 거래 필터링
  const FilterTransactionsByPeriod = () => {
    // TODO: [2-4] State.SelectedPeriod 기준으로 State.Transactions 필터링 후 반환
  };

  // [2-4] 카테고리 조건에 맞는 거래 필터링
  const FilterTransactionsByCategory = () => {
    // TODO: [2-4] State.SelectedCategory 기준으로 State.Transactions 필터링 후 반환
  };

  // [3-1] 월별 수입/지출 합계 계산
  const CalculateMonthlySummary = () => {
    // TODO: [3-1] State.Transactions를 월별로 그룹화하여 income/expense 합계 계산 후 반환
  };

  // [3-4] 최근 거래 내역 추출
  const GetRecentTransactions = () => {
    // TODO: [3-4] State.Transactions를 날짜 내림차순 정렬 후 slice(0, 5) 반환
  };

  return {
    State,
    FetchTransactions,
    CreateTransaction,
    FetchTransactionById,
    UpdateTransaction,
    DeleteTransaction,
    SetSelectedPeriod,
    SetSelectedCategory,
    FilterTransactionsByPeriod,
    FilterTransactionsByCategory,
    CalculateMonthlySummary,
    GetRecentTransactions,
  };
});
