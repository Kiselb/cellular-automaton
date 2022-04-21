import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "./Auth";
import { UseAuthReturn } from "./Auth";

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom') as any,
//    useLocation: () => ({ location: "app" }),
// }));

// jest.setMock("./Auth", () => ({
//     ...jest.requireActual('./Auth') as any,
//     useAuth: () => ({ user: "User" }),
// }));

const getDataFromUseAuthReturn = ({ user }: UseAuthReturn) => ({
  user,
});
it("Check Defaults", () => {
  const { result } = renderHook(useAuth);

  expect(getDataFromUseAuthReturn(result.current)).toEqual({
    user: "",
  });
});
it("Check Login", () => {
  const userName = "User";
  const { result } = renderHook(useAuth);

  act(() => result.current.login(userName));
  expect(result.current.user).toBe(userName);
  expect(localStorage.getItem("cellular-automaton.user") || "").toBe(userName);
});
it("Check Logout", () => {
  const { result } = renderHook(useAuth);
  const probe = jest.fn();

  act(() => result.current.logout(probe));
  expect(result.current.user).toBe("");
  expect(localStorage.getItem("cellular-automaton.user") || "").toBe("");
  expect(probe).toBeCalledTimes(1);
});
// it("Check Require Auth", () => {

//     let container: HTMLDivElement | null = document.createElement("div");
//     document.body.appendChild(container);

//     act(() => {
//         render(
//             <AuthProvider>
//                 <Router>
//                     <RequireAuth>
//                         <div></div>
//                     </RequireAuth>
//                 </Router>
//             </AuthProvider>,
//             container
//         )
//     });
//     expect(container.innerHTML).toBe("<div></div>")

//     !!container && unmountComponentAtNode(container);
//     !!container && container.remove();
//     container = null;
// });
